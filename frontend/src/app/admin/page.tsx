"use client";

import { useEffect, useState } from "react";
import { useUser, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { adminEmails } from "@/lib/adminEmails";

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (isLoaded && user && !adminEmails.includes(user.primaryEmailAddress?.emailAddress || "")) {
      router.push("/");
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (isLoaded && user && adminEmails.includes(user.primaryEmailAddress?.emailAddress || "")) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/emails`)
        .then(res => res.json())
        .then(data => setEmails(data))
        .catch(err => console.error("Erro ao buscar emails:", err));
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Verificando acesso...</p>
      </main>
    );
  }

  return (
    <>
      <SignedOut>
        <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <p className="mb-4">Você precisa estar logado para acessar esta página.</p>
            <SignIn />
          </div>
        </main>
      </SignedOut>

      <SignedIn>
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
      </SignedIn>
    </>
  );
}
