// src/app/admin/page.tsx
import { db } from "@/db";
import { transactions, nominals } from "@/db/database/schema";
import { desc } from "drizzle-orm";
import { DashboardStats } from "@/components/admin/dashboardstats";
import { TransactionTable } from "@/components/admin/transactiontable";

/**
 * Admin Dashboard - Clean Code Version
 * 1. Menjalankan query secara paralel untuk kecepatan akses.
 * 2. Mengoptimalkan perhitungan statistik dengan satu kali loop (O(n)).
 * 3. Mengikuti standar Server Components Next.js 15+.
 */

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 1. Parallel Fetching: Menjalankan kedua query secara bersamaan untuk mengurangi waktu loading (Waterfall minimization)
  const [realTransactions, nominalList] = await Promise.all([
    db.query.transactions.findMany({
      orderBy: [desc(transactions.createdAt)],
      with: { game: true, nominal: true },
    }),
    db.select().from(nominals),
  ]);

  // 2. Optimized Statistics Logic: Menghitung semua data dalam satu kali jalan (Reduce)
  // Ini jauh lebih efisien daripada melakukan .filter() berkali-kali
  const stats = realTransactions.reduce(
    (acc, trx) => {
      const amount = Number(trx.amount || 0);
      const status = trx.status;

      if (status === "sukses") {
        acc.successCount++;
        acc.grossRevenue += amount;
      } else if (status === "pending") {
        acc.pendingCount++;
      } else if (status === "gagal") {
        acc.failedCount++;
      }

      return acc;
    },
    { successCount: 0, pendingCount: 0, failedCount: 0, grossRevenue: 0 },
  );

  // Perhitungan Laba (Margin 15%)
  const netProfit = stats.grossRevenue * 0.15;

  return (
    <div className="flex-1 overflow-y-auto bg-background/50">
      {/* Dashboard Stats Section */}
      <DashboardStats
        apiBalance={850500} // TODO: Hubungkan ke Provider API (Digiflazz/Tripay)
        grossRevenue={stats.grossRevenue}
        netProfit={netProfit}
        totalTransactions={realTransactions.length}
        successCount={stats.successCount}
        pendingCount={stats.pendingCount}
        failedCount={stats.failedCount}
        totalProducts={nominalList.length}
      />

      {/* Main Content: Table */}
      <main className="p-6 pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Mengirimkan data transaksi ke tabel admin */}
          <TransactionTable transactions={realTransactions} />
        </div>
      </main>
    </div>
  );
}
