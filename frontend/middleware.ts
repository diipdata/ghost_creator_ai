import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definir rotas públicas
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/obrigado"]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth.protect(); // correto: sem "()"
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
