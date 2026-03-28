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
 * 1. Tabel Games
 * Menggunakan slug sebagai identitas unik untuk URL SEO-friendly.
 */
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., 'mobile', 'pc'
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * 2. Tabel Nominals
 * Menghubungkan paket produk dengan game terkait.
 */
export const nominals = pgTable("nominals", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .references(() => games.id, { onDelete: "cascade" })
    .notNull(),
  label: varchar("label", { length: 255 }).notNull(), // e.g., "86 Diamonds"
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
});

/**
 * 3. Tabel Transactions
 * Mencatat riwayat pembelian secara mendetail.
 */
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").references(() => games.id, {
    onDelete: "set null",
  }),
  nominalId: integer("nominal_id").references(() => nominals.id, {
    onDelete: "set null",
  }),

  // Data Akun Game
  userId: varchar("user_id", { length: 100 }).notNull(),
  zoneId: varchar("zone_id", { length: 100 }),

  // Data Transaksi
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, success, failed

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * 4. Tabel Users (Admin)
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * --- RELATIONS (Drizzle API) ---
 * Digunakan untuk query nested yang efisien di Server Components.
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
