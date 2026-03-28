// src/app/actions/admin.ts
"use server";

import { db } from "@/db";
import { games, nominals } from "@/db/database/schema";
import { revalidatePath } from "next/cache";

// Fungsi Tambah Game
export async function addGame(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;

  if (!title || !slug || !category || !image) {
    throw new Error("Semua kolom harus diisi");
  }

  await db.insert(games).values({
    title,
    slug,
    category,
    image,
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

// Fungsi Tambah Nominal (Harga Diamond)
export async function addNominal(formData: FormData) {
  const gameId = formData.get("gameId") as string;
  const label = formData.get("label") as string;
  const price = formData.get("price") as string;

  if (!gameId || !label || !price) {
    throw new Error("Semua kolom nominal harus diisi");
  }

  await db.insert(nominals).values({
    gameId: parseInt(gameId),
    label,
    price,
  });

  revalidatePath("/");
  revalidatePath("/admin");
}
