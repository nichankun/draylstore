"use client";

import { useState } from "react";
import {
  MoreVertical,
  Search,
  Filter,
  Calendar,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { InferSelectModel } from "drizzle-orm";
import { transactions, games, nominals } from "@/db/database/schema";

// --- Types ---
type TransactionWithRelations = InferSelectModel<typeof transactions> & {
  game: InferSelectModel<typeof games> | null;
  nominal: InferSelectModel<typeof nominals> | null;
};

interface TransactionTableProps {
  transactions?: TransactionWithRelations[];
}

// --- Constants for Status Mapping ---
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    variant: "outline" as const,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  sukses: {
    label: "Success",
    variant: "default" as const,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  gagal: {
    label: "Failed",
    variant: "destructive" as const,
    color: "text-destructive bg-destructive/10 border-destructive/20",
  },
};

export function TransactionTable({ transactions = [] }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-card rounded-2xl border-2 border-border shadow-sm overflow-hidden flex flex-col">
      {/* Header & Controls */}
      <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Aktivitas Transaksi
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitoring seluruh pesanan masuk secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari ID Pesanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl bg-background border-border focus-visible:ring-primary/20"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl gap-2 font-bold px-4"
          >
            <Filter size={14} />
            Filter
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted/30 text-muted-foreground border-b border-border">
            <tr className="text-[10px] uppercase font-black tracking-widest">
              <th className="px-6 py-4">ID / Waktu</th>
              <th className="px-6 py-4">Informasi Akun</th>
              <th className="px-6 py-4">Produk & Nominal</th>
              <th className="px-6 py-4">Pembayaran</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.length === 0 ? (
              <EmptyState />
            ) : (
              transactions.map((trx) => (
                <TransactionRow key={trx.id} trx={trx} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          Total: {transactions.length} Records
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-lg text-[11px] font-bold"
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 rounded-lg text-xs font-bold bg-primary/10 text-primary"
          >
            1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-lg text-[11px] font-bold"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function TransactionRow({ trx }: { trx: TransactionWithRelations }) {
  const status = (trx.status as keyof typeof STATUS_CONFIG) || "pending";
  const config = STATUS_CONFIG[status];

  const formattedDate = trx.createdAt
    ? new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(trx.createdAt))
    : "-";

  return (
    <tr className="hover:bg-muted/20 transition-all group">
      {/* ID & Time */}
      <td className="px-6 py-5">
        <div className="font-bold text-foreground tracking-tight">
          #{trx.id.toString().padStart(5, "0")}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-1 font-medium">
          <Calendar size={10} />
          {formattedDate}
        </div>
      </td>

      {/* Account Info */}
      <td className="px-6 py-5">
        <div className="font-bold text-foreground">{trx.userId}</div>
        {trx.zoneId && (
          <Badge
            variant="secondary"
            className="mt-1 h-5 text-[9px] font-black tracking-wider uppercase bg-primary/5 text-primary border-none"
          >
            Zone: {trx.zoneId}
          </Badge>
        )}
      </td>

      {/* Product & Price */}
      <td className="px-6 py-5">
        <div className="font-bold text-foreground flex items-center gap-2">
          {trx.game?.title || "Unknown Game"}
          <ChevronRight size={12} className="text-muted-foreground" />
          <span className="text-primary font-black">
            {trx.nominal?.label || "Unknown Item"}
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground mt-1 font-bold">
          TOTAL: Rp {Number(trx.amount).toLocaleString("id-ID")}
        </div>
      </td>

      {/* Payment Method */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-foreground">
          <CreditCard size={14} className="text-muted-foreground" />
          {trx.paymentMethod || "QRIS"}
        </div>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-5">
        <Badge
          className={cn(
            "rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border shadow-none",
            config.color,
          )}
        >
          {config.label}
        </Badge>
      </td>

      {/* Actions */}
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 items-center">
          {status === "pending" && (
            <Button
              size="sm"
              className="h-7 text-[9px] font-black px-3 rounded-lg uppercase"
            >
              Proses
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground group-hover:text-foreground"
          >
            <MoreVertical size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={6} className="px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-4 bg-muted/50 rounded-full mb-2">
            <Search size={32} className="text-muted-foreground opacity-20" />
          </div>
          <p className="text-sm font-bold text-muted-foreground">
            Belum ada transaksi
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-50">
            Seluruh pesanan pelanggan akan muncul di daftar ini.
          </p>
        </div>
      </td>
    </tr>
  );
}
