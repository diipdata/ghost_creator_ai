from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import sqlite3

app = FastAPI()

# CORS para permitir frontend se comunicar com o backend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Banco SQLite
DATABASE = "emails.db"

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

# GET básico que “acorda” o app antes do POST
@app.get("/")
async def root():
    return {"status": "ok"}

# Modelo para validação de entrada
class EmailInput(BaseModel):
    email: EmailStr

@app.post("/api/subscribe")
async def subscribe(data: EmailInput):
    email = data.email

    try:
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute("INSERT INTO emails (email) VALUES (?)", (email,))
        conn.commit()
        return {"message": "E-mail cadastrado com sucesso!"}
    except sqlite3.IntegrityError:
        return {"message": "E-mail já cadastrado"}
    finally:
        conn.close()

# Novo bloco para tratar o preflight CORS
@app.options("/api/subscribe")
async def options_handler():
    response = Response()
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)