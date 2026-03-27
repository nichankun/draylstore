import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./database/schema"; // Impor semua tabel dan relasi

/**
 * Inisialisasi Database
 * Menambahkan objek schema di sini sangat krusial agar TypeScript
 * mengenali properti .query dan relasi antar tabel.
 */
export const db = drizzle(process.env.DATABASE_URL!, { schema });
