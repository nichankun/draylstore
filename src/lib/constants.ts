// src/lib/constants.ts

/**
 * Konfigurasi Dasar Website
 * Digunakan untuk SEO dan informasi umum di seluruh aplikasi
 */
export const SITE_CONFIG = {
  name: "DraylStore",
  description: "Layanan Top Up Game Tercepat, Murah, dan Otomatis 24 Jam.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://draylstore.com",
  contact: {
    whatsapp: "628123456789",
    instagram: "@draylstore.id",
  },
};

/**
 * Metode Pembayaran
 * Data ini bisa tetap di sini jika Anda belum memindahkannya ke database.
 * Logo menggunakan URL placeholder yang konsisten dengan tema gaming.
 */
export const PAYMENT_METHODS = [
  {
    id: "dana",
    name: "DANA",
    logo: "https://placehold.co/200x60/ffffff/007aff?text=DANA",
  },
  {
    id: "ovo",
    name: "OVO",
    logo: "https://placehold.co/200x60/ffffff/4b0082?text=OVO",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    logo: "https://placehold.co/200x60/ffffff/ee4d2d?text=ShopeePay",
  },
  {
    id: "qris",
    name: "QRIS All Payment",
    logo: "https://placehold.co/200x60/ffffff/000000?text=QRIS",
  },
];

/**
 * Kategori Game
 * Digunakan untuk filter di halaman utama atau dashboard admin
 */
export const GAME_CATEGORIES = [
  { label: "Semua Game", value: "all" },
  { label: "Mobile Legends", value: "mlbb" },
  { label: "PC Games", value: "pc" },
  { label: "Voucher", value: "voucher" },
];

/**
 * Tipe Data (TypeScript Interfaces)
 * Menghapus interface yang sudah di-handle oleh Drizzle InferSelectModel.
 * Menyisakan tipe khusus untuk UI state jika diperlukan.
 */
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
