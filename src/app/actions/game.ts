"use server";

import { db } from "@/db";
import { games } from "@/db/database/schema";
import { ilike } from "drizzle-orm";

/**
 * Antarmuka hasil pencarian yang dikirim ke Client Component.
 */
export interface SearchResult {
  id: number;
  title: string;
  slug: string;
}

/**
 * Server Action untuk mencari game berdasarkan judul.
 * Fungsi ini aman dijalankan di sisi server.
 */
export async function searchGamesAction(
  query: string,
): Promise<SearchResult[]> {
  // Validasi input minimal 2 karakter untuk efisiensi database
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const results = await db
      .select({
        id: games.id,
        title: games.title,
        slug: games.slug,
      })
      .from(games)
      .where(ilike(games.title, `%${query.trim()}%`))
      .limit(8); // Batasi hasil agar tampilan tetap rapi

    return results;
  } catch (error) {
    // Log error di server untuk debugging internal
    console.error("Gagal melakukan pencarian game:", error);
    return [];
  }
}
