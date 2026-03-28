// src/app/admin/transactions/page.tsx
import { db } from "@/db";
import { transactions } from "@/db/database/schema";
import { desc } from "drizzle-orm";
import { TransactionTable } from "@/components/admin/transactiontable";

// Wajib: Matikan caching agar halaman selalu menampilkan data paling baru
export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  // Tarik seluruh data transaksi dari database
  // Catatan: Kelak jika data sudah ribuan, kita bisa menambahkan limit() dan offset() untuk Pagination di sini
  const allTransactions = await db.query.transactions.findMany({
    orderBy: [desc(transactions.createdAt)],
    with: { game: true, nominal: true },
  });

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Halaman */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Semua Transaksi
          </h1>
          <p className="text-muted-foreground mt-1">
            Pantau, cari, dan kelola seluruh riwayat top-up pelanggan Anda di
            sini.
          </p>
        </div>

        {/* Panggil Komponen Tabel yang sudah kita buat sebelumnya */}
        <TransactionTable transactions={allTransactions} />
      </div>
    </div>
  );
}
