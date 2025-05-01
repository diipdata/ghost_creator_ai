import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/obrigado", "/sign-in"], // adicione aqui todas as rotas públicas
});

export const config = {
  matcher: [
    // Protege todas as rotas, exceto arquivos estáticos e APIs
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
