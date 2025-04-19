"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/emails`)
      .then(res => res.json())
      .then(data => setEmails(data))
      .catch(err => console.error("Erro ao buscar emails:", err));
  }, []);

  return (
    <main className="min-h-screen p-8 text-white bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      <ul className="space-y-2">
        {emails.map((item: any) => (
          <li key={item.id} className="bg-gray-800 p-3 rounded">
            {item.email}
          </li>
        ))}
      </ul>
    </main>
  );
}