from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import sqlite3

app = FastAPI()

# Banco SQLite (mover para o topo)
DATABASE = "emails.db"

# CORS para permitir frontend se comunicar com o backend
origins = [
    "http://localhost:3000",
    "https://ghost-creator-ai.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROTA RAIZ
@app.get("/")
async def root():
    return {"status": "ok"}

@app.get("/api/emails")
async def list_emails():
    print("🔍 Rota /api/emails acessada")
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT id, email FROM emails")
    emails = [{"id": row[0], "email": row[1]} for row in c.fetchall()]
    conn.close()
    return emails

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Modelo para validação de entrada
class EmailInput(BaseModel):
    email: EmailStr

@app.post("/api/subscribe")
async def subscribe(data: EmailInput):
    conn = sqlite3.connect(DATABASE)
    try:
        c = conn.cursor()
        c.execute("INSERT INTO emails (email) VALUES (?)", (data.email,))
        conn.commit()
        return {"message": "E-mail cadastrado com sucesso!"}
    except sqlite3.IntegrityError:
        return {"message": "E-mail já cadastrado"}
    finally:
        conn.close()

@app.options("/api/subscribe")
async def options_handler():
    resp = Response()
    resp.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "*"
    return resp

if __name__ == "__main__":
    import uvicorn, os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)