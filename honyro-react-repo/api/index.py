# api/index.py  (solo health en /api/)
from fastapi import FastAPI
from server.main import health

app = FastAPI()

@app.get("/")
def _health():
    return health()
