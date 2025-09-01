from fastapi import FastAPI
from server.main import BatchPayload, translate_batch

app = FastAPI()

@app.post("/")
def _translate_batch(payload: BatchPayload):
    return translate_batch(payload)
