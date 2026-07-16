import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Se estiver deslogado e tentar acessar qualquer página diferente de /login
  if (!session && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se estiver logado e tentar acessar /login
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // acessando rotas que ele não pode
  if (session?.user.activeProfile != "monitor" && pathname === "/profile") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (session?.user.activeProfile != "aluno" && pathname === "/tutors") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp|ico|css|js|woff2?)$).*)",
  ],
};