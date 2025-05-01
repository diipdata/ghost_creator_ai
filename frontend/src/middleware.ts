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
    // Recomendado pela Clerk + Next.js App Router
    "/((?!_next|.*\\..*).*)",
  ],
};
