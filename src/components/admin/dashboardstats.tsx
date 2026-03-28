// src/components/admin/dashboardstats.tsx
import {
  Bell,
  DollarSign,
  Wallet,
  Activity,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "../ui/button";

// 1. Definisikan tipe data yang akan diterima oleh komponen ini
export interface DashboardStatsProps {
  apiBalance?: number;
  grossRevenue?: number;
  netProfit?: number;
  totalTransactions?: number;
  successCount?: number;
  pendingCount?: number;
  failedCount?: number;
  totalProducts?: number;
}

// 2. Tangkap props di parameter fungsi dan berikan nilai default (fallback)
export function DashboardStats({
  apiBalance = 0,
  grossRevenue = 0,
  netProfit = 0,
  totalTransactions = 0,
  successCount = 0,
  pendingCount = 0,
  failedCount = 0,
  totalProducts = 0,
}: DashboardStatsProps) {
  return (
    <>
      {/* Top Header */}
      <header className="h-16 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60 border-b border-border flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <h1 className="text-lg font-bold text-foreground hidden sm:block">
            Ikhtisar Hari Ini
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Saldo API Dinamis */}
          <div className="hidden sm:flex items-center gap-3 bg-muted/50 border border-border px-4 py-1.5 rounded-full">
            <div className="flex items-center gap-1.5 border-r border-border pr-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-muted-foreground">
                Digiflazz API
              </span>
            </div>
            <span className="text-sm font-black text-primary">
              Rp {apiBalance.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="bg-primary/10 text-primary hover:bg-primary/20 rounded-xl"
            >
              <Bell size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-6 pb-0">
        {/* Card 1: Pendapatan Kotor */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Pendapatan Kotor
            </h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">
            Rp {grossRevenue.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-emerald-500 font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> Dari transaksi sukses
          </p>
        </div>

        {/* Card 2: Laba Bersih */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Estimasi Laba Bersih
            </h3>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">
            Rp {netProfit.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> Margin rata-rata 15%
          </p>
        </div>

        {/* Card 3: Total Transaksi */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Transaksi
            </h3>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">
            {totalTransactions.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-muted-foreground font-medium mt-2">
            {successCount} Sukses, {pendingCount} Pending,{" "}
            <span className="text-destructive font-bold">
              {failedCount} Gagal
            </span>
          </p>
        </div>

        {/* Card 4: Produk */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Produk Tersinkron
            </h3>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <RefreshCw size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">
            {totalProducts.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-muted-foreground font-medium mt-2 flex items-center justify-between">
            <span>Database internal</span>
            <button className="text-primary hover:underline font-semibold">
              Sync Now
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
