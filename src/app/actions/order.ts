"use server";

import { db } from "@/db";
import { transactions } from "@/db/database/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(formData: FormData) {
  // 1. Ekstraksi data
  const userId = formData.get("userId")?.toString();
  const zoneId = formData.get("zoneId")?.toString();
  const nominalId = formData.get("nominalId")?.toString();
  const paymentMethod = formData.get("paymentMethod")?.toString();
  const amountString = formData.get("amount")?.toString();

  // 2. Validasi Kelengkapan Data
  if (!userId || !amountString || !nominalId || !paymentMethod) {
    throw new Error("Data pesanan tidak lengkap");
  }

  // 3. Validasi Logika Angka (Pastikan bukan huruf dan lebih dari 0)
  const numericAmount = Number(amountString);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    throw new Error("Nominal amount tidak valid");
  }

  // 4. Proses Database
  try {
    await db.insert(transactions).values({
      userId,
      zoneId: zoneId || "",
      customerName: "Guest",
      gameId: 1,
      amount: amountString, // <-- PERBAIKAN: Kirim kembali sebagai string sesuai permintaan skema
      paymentMethod,
      status: "pending",
    });

    console.log(`Memproses pesanan untuk paket ID: ${nominalId}`);
  } catch (error) {
    console.error("Gagal insert ke database:", error);
    throw new Error("Gagal memproses pesanan, silakan coba lagi.");
  }

  // 5. Update Cache & Redirect (Di luar try-catch)
  revalidatePath("/admin");
  redirect(`/status?user=${userId}&method=${paymentMethod}`);
}
