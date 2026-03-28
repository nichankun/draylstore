// src/app/actions/auth.ts
"use server";

import { db } from "@/db";
import { users } from "@/db/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// 1. Definisikan tipe untuk state login
export type LoginState = {
  error?: string;
};

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "rahasia-super-draylstore-2026-aman",
);

/**
 * Fungsi Login
 * prevState sekarang menggunakan tipe LoginState, bukan any
 */
export async function loginAdmin(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return { error: "Email atau kata sandi salah." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: "Email atau kata sandi salah." };
    }

    const token = await new SignJWT({
      id: user.id,
      role: user.role,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(SECRET_KEY);

    (await cookies()).set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  } catch (error) {
    // Menangani error redirect Next.js agar tidak dianggap sebagai error sistem
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Login error:", error);
    return { error: "Terjadi kesalahan sistem saat login." };
  }

  redirect("/admin");
}

/**
 * Fungsi Tambah Admin
 */
export async function registerAdmin(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string) || "admin";

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role,
    });

    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Gagal menambah admin:", error);
    throw new Error(
      "Gagal menyimpan pengguna baru. Pastikan email belum terdaftar.",
    );
  }
}

/**
 * Fungsi Logout
 */
export async function logout() {
  (await cookies()).delete("admin_session");
  redirect("/login");
}
