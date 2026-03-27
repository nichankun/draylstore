"use server";

import { db } from "@/db";
import { transactions } from "@/db/database/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
  // 1. Ekstraksi data dari form
  const userId = formData.get("userId") as string;
  const zoneId = formData.get("zoneId") as string;
  const nominalId = formData.get("nominalId") as string; // Digunakan untuk log/validasi
  const paymentMethod = formData.get("paymentMethod") as string;
  const amount = formData.get("amount") as string;

  // 2. Simulasi Validasi (Penting untuk standar 2026)
  if (!userId || !amount || !nominalId) {
    throw new Error("Data pesanan tidak lengkap");
  }

  // 3. Simpan ke Database
  await db.insert(transactions).values({
    userId,
    zoneId,
    customerName: "Guest",
    gameId: 1,
    amount: amount,
    paymentMethod: paymentMethod, // Sekarang variabel digunakan
    status: "pending",
  });

  // 4. Update Cache & Redirect
  // nominalId bisa digunakan untuk metadata redirect jika diperlukan
  console.log(`Memproses pesanan untuk paket ID: ${nominalId}`);

  revalidatePath("/admin");

  // Menggunakan redirect setelah proses berhasil
  redirect(`/status?user=${userId}&method=${paymentMethod}`);
}
