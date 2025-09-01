from fastapi import FastAPI
from server.main import BatchPayload, translate_batch
app = FastAPI()

@app.post("/")
@app.post("/api/translate-batch")
@app.post("/api/translate-batch/")
def _translate_batch(payload: BatchPayload):
    return translate_batch(payload)
