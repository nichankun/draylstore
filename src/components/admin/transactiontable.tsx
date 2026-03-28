// src/components/admin/transactiontable.tsx
"use client";

import { MoreVertical, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { InferSelectModel } from "drizzle-orm";
import { transactions, games, nominals } from "@/db/database/schema";

type TransactionWithRelations = InferSelectModel<typeof transactions> & {
  game: InferSelectModel<typeof games> | null;
  nominal: InferSelectModel<typeof nominals> | null;
};

interface TransactionTableProps {
  transactions?: TransactionWithRelations[];
}

export function TransactionTable({ transactions = [] }: TransactionTableProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-foreground">
          Transaksi Real-time
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari ID Pesanan..."
              className="pl-9 bg-background border-border focus-visible:ring-primary"
            />
          </div>
          <Button variant="secondary" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">ID / Waktu</th>
              <th className="px-6 py-4">Tujuan (ID Game)</th>
              <th className="px-6 py-4">Item & Harga</th>
              <th className="px-6 py-4">Status Pembayaran</th>
              <th className="px-6 py-4">Status API</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  Belum ada transaksi saat ini.
                </td>
              </tr>
            ) : (
              transactions.map((trx) => {
                // PERBAIKAN: Gunakan nilai cadangan "pending" jika trx.status bernilai null
                const safeStatus = trx.status || "pending";
                // Gunakan nilai cadangan "-" jika paymentMethod bernilai null
                const safePaymentMethod = trx.paymentMethod || "-";

                // Tentukan logika warna status berdasarkan variabel yang sudah aman
                const isPending = safeStatus === "pending";
                const isSuccess = safeStatus === "sukses";
                const isFailed = safeStatus === "gagal";

                return (
                  <tr
                    key={trx.id}
                    className={cn(
                      "hover:bg-muted/30 transition-colors",
                      isFailed && "bg-destructive/5",
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">
                        TRX-{trx.id.toString().padStart(4, "0")}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {trx.createdAt
                          ? new Date(trx.createdAt).toLocaleString("id-ID")
                          : "-"}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        {trx.userId}
                      </div>
                      {trx.zoneId && (
                        <div className="text-[11px] text-primary font-semibold">
                          Zone: {trx.zoneId}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">
                        {trx.game?.title || "Game ID " + trx.gameId} -{" "}
                        {trx.nominal?.label || "Item " + trx.nominalId}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Harga: Rp{" "}
                        {Number(trx.amount || 0).toLocaleString("id-ID")}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border",
                          isPending
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isPending ? "bg-amber-500" : "bg-emerald-500",
                          )}
                        ></span>
                        {isPending ? "UNPAID" : "PAID"} (
                        {safePaymentMethod.toUpperCase()})
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border",
                          isPending
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : isSuccess
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : "bg-destructive/10 text-destructive border-destructive/20",
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isPending
                              ? "bg-amber-500"
                              : isSuccess
                                ? "bg-emerald-500"
                                : "bg-destructive",
                          )}
                        ></span>
                        {/* PERBAIKAN: Gunakan safeStatus */}
                        {safeStatus.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      {isPending && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-[10px] border-primary text-primary hover:bg-primary/10 px-2"
                        >
                          Proses
                        </Button>
                      )}
                      {isFailed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-[10px] text-muted-foreground px-2"
                        >
                          Refund
                        </Button>
                      )}
                      <button className="text-muted-foreground hover:text-foreground transition ml-2">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Menampilkan {transactions.length} transaksi terbaru</span>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="h-8 px-3">
            Sebelumnya
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-8 px-3 bg-primary/20 text-primary hover:bg-primary/30 border-primary/30"
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-3">
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
