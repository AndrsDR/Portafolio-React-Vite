from fastapi import FastAPI
from server.main import TranslatePayload, translate
app = FastAPI()

@app.post("/")
@app.post("/api/translate")
@app.post("/api/translate/")
def _translate(payload: TranslatePayload):
    return translate(payload)
