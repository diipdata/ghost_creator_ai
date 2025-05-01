import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define as rotas públicas que não exigem autenticação
const isPublicRoute = createRouteMatcher([ 
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/obrigado"
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) { await auth.protect();
  }
});

export const config = {
  matcher: [
    // Ignora arquivos estáticos e internos do Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre aplica middleware em rotas de API
    '/(api|trpc)(.*)',
  ],
};
