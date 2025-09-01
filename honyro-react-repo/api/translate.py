import json
from deep_translator import GoogleTranslator

_CACHE = {}
_MAX = 5000

def _json(status, obj):
    return {
        "statusCode": status,
        "headers": {"content-type": "application/json; charset=utf-8"},
        "body": json.dumps(obj, ensure_ascii=False)
    }

def _get_body(request):
    try:
        if isinstance(request, dict):
            body = request.get("body", "")
        else:
            body = getattr(request, "body", "") or ""
        if isinstance(body, (bytes, bytearray)):
            return body.decode("utf-8", "ignore")
        return body or ""
    except Exception:
        return ""

def handler(request):
    q = ""
    try:
        raw = _get_body(request)
        data = json.loads(raw or "{}")
        q = (data.get("q") or "").strip()
        src = (data.get("source") or "en").lower().strip()
        tgt = (data.get("target") or "es").lower().strip()

        if not q:
            return _json(200, {"translatedText": ""})

        key = (src, tgt, q)
        if key in _CACHE:
            return _json(200, {"translatedText": _CACHE[key]})

        out = GoogleTranslator(source=src, target=tgt).translate(q)
        out = out if isinstance(out, str) and out.strip() else q

        if len(_CACHE) >= _MAX:
            _CACHE.pop(next(iter(_CACHE)))
        _CACHE[key] = out

        return _json(200, {"translatedText": out})
    except Exception as e:
        # Fallback controlado: no referenciar variables locales que podrían no existir
        return _json(200, {"translatedText": q, "error": str(e)})
