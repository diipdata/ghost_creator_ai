import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/obrigado"]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth.protect(); // <- Aqui está o erro corrigido!
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
