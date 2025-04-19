"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");

  // 1) “Acorda” o backend na Render (ou localhost)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/`, { method: "GET" })
      .then(() => console.log("Backend acordado com sucesso."))
      .catch((err) => console.error("Erro ao acordar o backend:", err));
  }, []);

  // 2) Envio do e‑mail
  const handleSubmit = async () => {
    setStatus("idle");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      console.log("Status da resposta:", response.status);
      console.log("API Response:", data);

      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      console.error("Erro na requisição:", err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1c1b2d] to-[#0d0c1a] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-4 text-center">Ghost Creator AI</h1>
      <p className="text-lg text-gray-300 max-w-xl text-center mb-8">
        Seu estúdio invisível movido por IA. Gere roteiros, cortes de vídeo,
        thumbnails e muito mais — tudo com o seu estilo.
      </p>

      <div className="flex gap-4 mb-4">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded text-black w-72"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
        >
          Comece agora
        </button>
      </div>

      {status === "success" && (
        <p className="text-green-400">E-mail cadastrado com sucesso!</p>
      )}
      {status === "error" && (
        <p className="text-red-400">Erro ao cadastrar. Tente novamente.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mt-12">
        <div className="bg-[#2a2942] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Roteiros Inteligentes</h2>
          <p className="text-gray-400">
            Gere roteiros prontos com base em temas, tendências ou seu estilo
            pessoal. Ideal para vídeos, shorts ou podcasts.
          </p>
        </div>
        <div className="bg-[#2a2942] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Cortes Automáticos</h2>
          <p className="text-gray-400">
            Envie vídeos longos e receba cortes ideais para reels, TikTok ou
            YouTube Shorts com legendas automáticas.
          </p>
        </div>
        <div className="bg-[#2a2942] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Thumbnails e Títulos</h2>
          <p className="text-gray-400">
            A IA cria thumbnails atraentes e títulos virais com base no
            conteúdo — tudo pronto para engajar.
          </p>
        </div>
      </div>
    </main>
  );
}