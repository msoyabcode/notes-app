
import { NextResponse } from "next/server"

export function middleware(request) {

  // Cookie se token lo
  const token = request.cookies.get("token")?.value

  // Protected routes define karo
  const protectedRoutes = ["/dashboard", "/create-note", "/edit-note"]

  // Check karo — kya current page protected hai?
  const isProtected = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Protected page hai + Token nahi → Login pe bhejo
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Token hai → Aage jaane do
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/create-note", "/edit-note/:path*"]
}