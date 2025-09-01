from fastapi import FastAPI
app = FastAPI()

@app.get("/")
@app.get("/api")
@app.get("/api/")
def health():
    return {"ok": True}

