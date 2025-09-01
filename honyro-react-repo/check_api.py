from fastapi.testclient import TestClient
from server.main import app

c = TestClient(app)
print("GET / ->", c.get("/").json())
print("POST /translate ->", c.post("/translate",
    json={"q":"hola","source":"es","target":"en"}).json())
print("POST /translate-batch ->", c.post("/translate-batch",
    json={"q":["hola","adiós"],"source":"es","target":"en"}).json())
