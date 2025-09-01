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
    try:
        raw = _get_body(request)
        data = json.loads(raw or "{}")

        items = data.get("q") or []
        src = (data.get("source") or "en").lower().strip()
        tgt = (data.get("target") or "es").lower().strip()

        out_list = []
        for raw_item in items:
            s = (raw_item or "").strip()
            if not s:
                out_list.append("")
                continue

            key = (src, tgt, s)
            cached = _CACHE.get(key)
            if cached is not None:
                out_list.append(cached)
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
