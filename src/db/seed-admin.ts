// src/db/seed-admin.ts
import { db } from "./index";
import { users } from "./database/schema";
import bcrypt from "bcryptjs";

async function main() {
  console.log("⏳ Memulai pembuatan akun Super Admin...");

  try {
    // Enkripsi kata sandi 'admin123'
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Masukkan data ke tabel users
    await db.insert(users).values({
      name: "Imam Hayatul", // Menggunakan nama dari sidebar Anda
      email: "admin@draylstore.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("✅ Akun Super Admin berhasil dibuat!");
    console.log("-----------------------------------");
    console.log("📧 Email    : admin@draylstore.com");
    console.log("🔑 Password : admin123");
    console.log("-----------------------------------");

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Gagal membuat admin. Kemungkinan email sudah ada di database.",
      error,
    );
    process.exit(1);
  }
}

main();
