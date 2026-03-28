// src/lib/constants.ts

/**
 * Konfigurasi Dasar Website
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
 * REVISI: Menggunakan path lokal untuk menghindari error dangerouslyAllowSVG
 * Pastikan file ini ada di folder: public/images/payments/
 */
export const PAYMENT_METHODS = [
  {
    id: "dana",
    name: "DANA",
    // Gunakan file .png atau .jpg lokal
    logo: "/pembayaran/dana.svg",
  },
  {
    id: "ovo",
    name: "OVO",
    logo: "/pembayaran/ovo.svg",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    logo: "/pembayaran/shopeepay.png",
  },
  {
    id: "qris",
    name: "QRIS All Payment",
    logo: "/pembayaran/qris.svg",
  },
];

/**
 * Kategori Game
 */
export const GAME_CATEGORIES = [
  { label: "Semua Game", value: "all" },
  { label: "Mobile Legends", value: "mlbb" },
  { label: "PC Games", value: "pc" },
  { label: "Voucher", value: "voucher" },
];

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
