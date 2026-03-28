// src/db/database/schema.ts
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Tabel Games
 * Dasar katalog game. Kolom 'price' di sini bersifat opsional (bisa untuk harga dasar).
 */
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Tabel Nominals (Pilihan Produk)
 * Menampung variasi produk per game (contoh: 172 Diamonds, 706 Diamonds).
 */
export const nominals = pgTable("nominals", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").references(() => games.id, {
    onDelete: "cascade",
  }),
  label: text("label").notNull(), // Contoh: "172 Diamonds"
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Harga paket
});

/**
 * Tabel Transactions
 * Mencatat data top-up, termasuk user_id game dan metode pembayaran.
 */
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").references(() => games.id, {
    onDelete: "cascade",
  }),
  nominalId: integer("nominal_id").references(() => nominals.id), // Referensi paket yang dibeli
  userId: text("user_id").notNull(),
  zoneId: text("zone_id"),
  customerName: text("customer_name").notNull(),
  status: text("status").default("pending"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Tabel Users (Pengelola Sistem / Admin)
 * Menyimpan data admin yang memiliki akses login ke dashboard.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"), // "superadmin" atau "admin"
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Relasi (Drizzle Relations API)
 * Memungkinkan pemanggilan nested data.
 */
export const gamesRelations = relations(games, ({ many }) => ({
  nominals: many(nominals),
  transactions: many(transactions),
}));

export const nominalsRelations = relations(nominals, ({ one }) => ({
  game: one(games, {
    fields: [nominals.gameId],
    references: [games.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  game: one(games, {
    fields: [transactions.gameId],
    references: [games.id],
  }),
  nominal: one(nominals, {
    fields: [transactions.nominalId],
    references: [nominals.id],
  }),
}));
