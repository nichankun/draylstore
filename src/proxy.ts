// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "rahasia-super-draylstore-2026-aman",
);

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("admin_session")?.value;

  // 1. LOGIKA REVERSE AUTH: Jika sudah login, dilarang masuk ke halaman /login
  if (path === "/login" && token) {
    try {
      // Verifikasi apakah tokennya masih valid
      await jwtVerify(token, SECRET_KEY);
      // Jika valid, redirect paksa ke dashboard
      return NextResponse.redirect(new URL("/admin", request.url));
    } catch {
      // Jika token ternyata sampah/expired, biarkan dia di halaman login
      return NextResponse.next();
    }
  }

  // 2. LOGIKA AUTH STANDAR: Jika mau ke /admin tapi tidak punya token
  if (path.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Verifikasi token untuk akses rute admin
  if (path.startsWith("/admin") && token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch {
      // Token tidak valid (dimanipulasi), hapus akses
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// PENTING: Tambahkan "/login" ke dalam matcher agar Proxy ini juga mengawasi halaman login
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
