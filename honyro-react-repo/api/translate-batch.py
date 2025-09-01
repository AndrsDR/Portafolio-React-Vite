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

def handler(request):
    try:
        body = request.get("body", "")
        if isinstance(body, bytes):
            body = body.decode("utf-8")
        data = json.loads(body or "{}")

        items = data.get("q") or []
        src = (data.get("source") or "en").lower().strip()
        tgt = (data.get("target") or "es").lower().strip()

        # lista alineada (mismo orden, incluyendo duplicados/vacíos como vacíos)
        out_list = []
        for raw in items:
            s = (raw or "").strip()
            if not s:
                out_list.append("")
                continue
            key = (src, tgt, s)
            if key in _CACHE:
                out_list.append(_CACHE[key])
                continue
            try:
                t = GoogleTranslator(source=src, target=tgt).translate(s)
                t = t if isinstance(t, str) and t.strip() else s
            except Exception:
                t = s
            if len(_CACHE) >= _MAX:
                _CACHE.pop(next(iter(_CACHE)))
            _CACHE[key] = t
            out_list.append(t)

        return _json(200, {"translations": out_list})
    except Exception as e:
        return _json(200, {"translations": [], "error": str(e)})
