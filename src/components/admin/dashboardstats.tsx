"use client";

import {
  Bell,
  DollarSign,
  Wallet,
  Activity,
  RefreshCw,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// --- Interfaces ---
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

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconClassName: string;
  children?: React.ReactNode;
}

// --- Sub-component untuk Kartu Statistik ---
function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  children,
}: StatCardProps) {
  return (
    <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            iconClassName,
          )}
        >
          <Icon size={16} />
        </div>
      </div>
      <p className="text-2xl font-black text-foreground">{value}</p>
      {children}
    </div>
  );
}

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
  const formatCurrency = (val: number) => `Rp ${val.toLocaleString("id-ID")}`;

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
          <div className="hidden sm:flex items-center gap-3 bg-muted/50 border border-border px-4 py-1.5 rounded-full">
            <div className="flex items-center gap-1.5 border-r border-border pr-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-muted-foreground">
                Digiflazz API
              </span>
            </div>
            <span className="text-sm font-black text-primary">
              {formatCurrency(apiBalance)}
            </span>
          </div>

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-6 pb-0">
        <StatCard
          title="Pendapatan Kotor"
          value={formatCurrency(grossRevenue)}
          icon={DollarSign}
          iconClassName="bg-emerald-500/10 text-emerald-500"
        >
          <p className="text-xs text-emerald-500 font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> Dari transaksi sukses
          </p>
        </StatCard>

        <StatCard
          title="Estimasi Laba Bersih"
          value={formatCurrency(netProfit)}
          icon={Wallet}
          iconClassName="bg-primary/10 text-primary"
        >
          <p className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> Margin rata-rata 15%
          </p>
        </StatCard>

        <StatCard
          title="Total Transaksi"
          value={totalTransactions.toLocaleString("id-ID")}
          icon={Activity}
          iconClassName="bg-indigo-500/10 text-indigo-500"
        >
          <p className="text-xs text-muted-foreground font-medium mt-2">
            {successCount} Sukses, {pendingCount} Pending,{" "}
            <span className="text-destructive font-bold">
              {failedCount} Gagal
            </span>
          </p>
        </StatCard>

        <StatCard
          title="Produk Tersinkron"
          value={totalProducts.toLocaleString("id-ID")}
          icon={RefreshCw}
          iconClassName="bg-orange-500/10 text-orange-500"
        >
          <div className="text-xs text-muted-foreground font-medium mt-2 flex items-center justify-between">
            <span>Database internal</span>
            <button className="text-primary hover:underline font-semibold">
              Sync Now
            </button>
          </div>
        </StatCard>
      </div>
    </>
  );
}
