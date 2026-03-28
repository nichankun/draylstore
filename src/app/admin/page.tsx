import { db } from "@/db";
import { transactions, nominals } from "@/db/database/schema";
import { desc } from "drizzle-orm";
import { DashboardStats } from "@/components/admin/dashboardstats";
import { TransactionTable } from "@/components/admin/transactiontable";

// Wajib: Matikan caching agar dashboard selalu menampilkan data terbaru setiap di-refresh
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 1. Tarik semua data transaksi dari database, urutkan dari yang terbaru
  const realTransactions = await db.query.transactions.findMany({
    orderBy: [desc(transactions.createdAt)],
    with: { game: true, nominal: true },
  });

  // 2. Tarik data nominal untuk menghitung total produk yang tersedia di toko Anda
  const nominalList = await db.select().from(nominals);

  // 3. --- LOGIKA KALKULASI STATISTIK ---
  const successCount = realTransactions.filter(
    (t) => t.status === "sukses",
  ).length;
  const pendingCount = realTransactions.filter(
    (t) => t.status === "pending",
  ).length;
  const failedCount = realTransactions.filter(
    (t) => t.status === "gagal",
  ).length;

  // Hitung Pendapatan Kotor (Hanya jumlahkan transaksi yang SUKSES)
  const grossRevenue = realTransactions
    .filter((t) => t.status === "sukses")
    .reduce((total, trx) => total + Number(trx.amount || 0), 0);

  // Estimasi Laba Bersih (Misalnya kita asumsikan rata-rata margin keuntungan adalah 15%)
  const netProfit = grossRevenue * 0.15;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 4. Kirim hasil kalkulasi ke komponen DashboardStats */}
      <DashboardStats
        apiBalance={850500} // TODO: Nanti bisa dihubungkan ke saldo API Digiflazz/Provider
        grossRevenue={grossRevenue}
        netProfit={netProfit}
        totalTransactions={realTransactions.length}
        successCount={successCount}
        pendingCount={pendingCount}
        failedCount={failedCount}
        totalProducts={nominalList.length}
      />

      {/* 5. Kirim data transaksi asli ke komponen TransactionTable */}
      <div className="p-6 pt-0">
        <div className="max-w-7xl mx-auto">
          <TransactionTable transactions={realTransactions} />
        </div>
      </div>
    </div>
  );
}
