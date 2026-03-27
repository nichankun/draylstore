"use client";

import { MoreVertical, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TransactionTable() {
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
              <th className="px-6 py-4">Item & Modal</th>
              <th className="px-6 py-4">Status Pembayaran</th>
              <th className="px-6 py-4">Status API</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {/* Row 1: Sukses */}
            <tr className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-foreground">TRX-9901A</div>
                <div className="text-[11px] text-muted-foreground">
                  Hari ini, 10:45 WITA
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-foreground">
                  12345678 (1234)
                </div>
                <div className="text-[11px] text-primary font-semibold">
                  081234567890
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-foreground">
                  MLBB - 86 Diamonds
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Modal: Rp 19.500 | Jual: Rp 22.000
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  PAID (QRIS)
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  SUKSES
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-muted-foreground hover:text-foreground transition">
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>

            {/* Row 2: Gagal */}
            <tr className="hover:bg-muted/30 transition-colors bg-destructive/5">
              <td className="px-6 py-4">
                <div className="font-bold text-foreground">TRX-9902B</div>
                <div className="text-[11px] text-muted-foreground">
                  Hari ini, 10:42 WITA
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-foreground">
                  98765432 (5678)
                </div>
                <div className="text-[11px] text-primary font-semibold">
                  085711223344
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-foreground">
                  FF - 140 Diamonds
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Modal: Rp 18.000 | Jual: Rp 21.500
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  PAID (DANA)
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive border border-destructive/20 px-2.5 py-1 rounded-md text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>{" "}
                  GAGAL (ID SALAH)
                </span>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="xs"
                  className="h-8 text-[10px] border-primary text-primary hover:bg-primary/10"
                >
                  Tembak Ulang
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  className="h-8 text-[10px] text-muted-foreground"
                >
                  Refund
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Menampilkan 1-3 dari 45 transaksi</span>
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
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-3">
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
