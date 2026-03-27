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
export function DashboardStats() {
  return (
    <>
      {/* Top Header */}
      <header className="h-16 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60 border-b border-border flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          {/* Tombol ini akan muncul di HP dan Desktop untuk toggle sidebar */}
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <h1 className="text-lg font-bold text-foreground hidden sm:block">
            Ikhtisar Hari Ini
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-muted/50 border border-border px-4 py-1.5 rounded-full">
            <div className="flex items-center gap-1.5 border-r border-border pr-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-muted-foreground">
                Digiflazz API
              </span>
            </div>
            <span className="text-sm font-black text-primary">Rp 850.500</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <ModeToggle /> {/* TOMBOL GANTI TEMA DI SINI */}
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
        {/* Card 1 */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Pendapatan Kotor
            </h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">Rp 1.250.000</p>
          <p className="text-xs text-emerald-500 font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +12.5% dari kemarin
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Estimasi Laba Bersih
            </h3>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">Rp 185.000</p>
          <p className="text-xs text-emerald-500 font-medium mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> Margin stabil
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Transaksi
            </h3>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">45</p>
          <p className="text-xs text-muted-foreground font-medium mt-2">
            40 Sukses, 3 Pending,{" "}
            <span className="text-destructive font-bold">2 Gagal</span>
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-card text-card-foreground p-5 rounded-xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Produk Tersinkron
            </h3>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <RefreshCw size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground">1,204</p>
          <p className="text-xs text-muted-foreground font-medium mt-2 flex items-center justify-between">
            <span>Update: 1 Jam Lalu</span>
            <button className="text-primary hover:underline font-semibold">
              Sync Now
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
