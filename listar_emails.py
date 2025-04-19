
import sqlite3

# Caminho para o banco de dados
db_path = "emails.db"

# Conecta ao banco
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Executa a consulta
cursor.execute("SELECT email FROM emails")
emails = cursor.fetchall()

# Mostra os resultados
print("E-mails cadastrados:")
for email in emails:
    print(email[0])

# Fecha a conexão
conn.close()