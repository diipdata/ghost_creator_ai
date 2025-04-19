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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Status da resposta:", response.status);
      console.log("API Response:", data);

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
    <main className="min-h-screen bg-gradient-to-b from-[#1c1b2d] to-[#0d0c1a] text-zinc-100 flex flex-col items-center justify-center px-4 py-12 sm:px-8 font-sans">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center leading-snug">
        Domine os bastidores. <br className="hidden sm:inline" /> Deixe a IA fazer o show.
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-6 text-center max-w-xl leading-relaxed">
        Um estúdio invisível de criação com IA que trabalha por você. Gere roteiros, vídeos, cortes e thumbnails com 1 clique.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-md">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded text-black w-full sm:w-72"
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded font-semibold text-white w-full sm:w-auto"
        >
          Quero criar sem aparecer
        </button>
      </div>

      {status === "success" && (
        <p className="text-green-400 text-sm sm:text-base">E-mail cadastrado com sucesso!</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm sm:text-base">Erro ao cadastrar. Tente novamente.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-12 px-2">
        <div className="bg-[#1e1d34] p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Roteiros Inteligentes</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Gere roteiros prontos com base em temas, tendências ou seu estilo pessoal. Ideal para vídeos, shorts ou podcasts.
          </p>
        </div>
        <div className="bg-[#1e1d34] p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Cortes Automáticos</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Envie vídeos longos e receba cortes ideais para reels, TikTok ou YouTube Shorts com legendas automáticas.
          </p>
        </div>
        <div className="bg-[#1e1d34] p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Thumbnails e Títulos</h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            A IA cria thumbnails atraentes e títulos virais com base no conteúdo — tudo pronto para engajar.
          </p>
        </div>
      </div>
    </main>
  );
}