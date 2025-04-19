export default function Obrigado() {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">🎉 Obrigado!</h1>
        <p className="text-lg text-gray-400 mb-6 text-center max-w-xl">
          Seu e-mail foi cadastrado com sucesso. Em breve você receberá novidades exclusivas sobre o Ghost Creator AI.
        </p>
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold text-white"
        >
          Voltar para a Home
        </a>
      </main>
    );
  }
  