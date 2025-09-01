# server/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Tuple
from deep_translator import GoogleTranslator

app = FastAPI()

# Ajusta orígenes si usas otro puerto/host para tu frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------- Modelos ---------
class TranslatePayload(BaseModel):
    q: str
    source: str
    target: str

class BatchPayload(BaseModel):
    q: List[str]
    source: str
    target: str

# --------- Caché simple en memoria ---------
_cache: Dict[Tuple[str, str, str], str] = {}

def _cached_get(src: str, tgt: str, text: str) -> str | None:
    return _cache.get((src, tgt, text))

def _cached_set(src: str, tgt: str, text: str, translated: str) -> None:
    _cache[(src, tgt, text)] = translated

# --------- Util ---------
def _translate_one(text: str, source: str, target: str) -> str:
    # deep_translator crea un cliente por llamada; para simplicidad lo mantenemos así
    return GoogleTranslator(source=source, target=target).translate(text)

# --------- Rutas ---------
@app.get("/")
def health():
    return {"ok": True}

@app.post("/translate")
def translate(payload: TranslatePayload):
    src = payload.source.lower().strip()
    tgt = payload.target.lower().strip()
    text = (payload.q or "").strip()

    if not text:
        return {"translatedText": ""}

    cached = _cached_get(src, tgt, text)
    if cached is not None:
        return {"translatedText": cached}

    try:
        out = _translate_one(text, src, tgt)
        _cached_set(src, tgt, text, out)
        return {"translatedText": out}
    except Exception as e:
        # Fallback controlado
        return {"translatedText": text, "error": str(e)}

@app.post("/translate-batch")
def translate_batch(payload: BatchPayload):
    src = payload.source.lower().strip()
    tgt = payload.target.lower().strip()

    # Normaliza: quita vacíos y duplicados preservando orden
    seen = set()
    items: List[str] = []
    for s in payload.q:
        s2 = (s or "").strip()
        if not s2 or s2 in seen:
            continue
        seen.add(s2)
        items.append(s2)

    result: Dict[str, str] = {}

    # 1) cache
    missing: List[str] = []
    for s in items:
        cached = _cached_get(src, tgt, s)
        if cached is not None:
            result[s] = cached
        else:
            missing.append(s)

    # 2) traducir faltantes (uno por uno)
    for s in missing:
        try:
            out = _translate_one(s, src, tgt)
        except Exception:
            # Fallback: regresa el original si falla
            out = s
        result[s] = out
        _cached_set(src, tgt, s, out)

    return {"translations": result}
