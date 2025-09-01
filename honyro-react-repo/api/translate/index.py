from fastapi import FastAPI
from server.main import TranslatePayload, translate

app = FastAPI()

@app.post("/")
def _translate(payload: TranslatePayload):
    return translate(payload)
