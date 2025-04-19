"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/`, { method: "GET" })
      .then(() => console.log("Backend acordado"))
      .catch((err) => console.error("Erro ao acordar backend:", err));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        window.location.href = "/obrigado";
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ghost Creator AI</h1>
      <p className="text-base md:text-lg text-gray-400 mb-6 text-center max-w-xl">
        Seu estúdio invisível, movido por IA. Gere vídeos, cortes, roteiros e thumbnails com o seu estilo, de forma automática.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-y-2 md:gap-x-4 mb-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-white text-black placeholder-gray-500 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded font-semibold text-sm w-full md:w-auto"
        >
          Comece agora
        </button>
      </div>

      {status === "success" && (
        <p className="text-green-400 text-sm text-center">E-mail cadastrado com sucesso!</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">Erro ao cadastrar. Tente novamente.</p>
      )}
    </main>
  );
}