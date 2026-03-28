// src/app/status/page.tsx
import { db } from "@/db";
import { transactions } from "@/db/database/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Copy, ChevronLeft, Clock, QrCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Standar Next.js 15+: searchParams adalah Promise
type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function StatusPage({ searchParams }: Props) {
  // 1. Await searchParams (Wajib di Next.js terbaru)
  const resolvedParams = await searchParams;
  const userId = resolvedParams.user;

  if (!userId) {
    return notFound();
  }

  // 2. Tarik data transaksi terakhir milik user ini dari Drizzle
  const order = await db.query.transactions.findFirst({
    where: eq(transactions.userId, userId),
    orderBy: [desc(transactions.createdAt)],
    with: {
      game: true,
      nominal: true,
    },
  });

  if (!order) {
    return notFound();
  }

  const isPending = order.status === "pending";

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col font-sans antialiased selection:bg-primary/30 selection:text-primary">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl shadow-primary/5 overflow-hidden relative">
          {/* Efek Glow di atas Card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-primary/20 blur-2xl"></div>

          {/* Header Invoice */}
          <div className="p-8 text-center border-b border-border/50 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-border mb-4 shadow-inner">
              {isPending ? (
                <Clock className="w-8 h-8 text-amber-500 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              )}
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase mb-2">
              {isPending ? "Menunggu Pembayaran" : "Pembayaran Berhasil"}
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Selesaikan pembayaran sebelum batas waktu habis agar pesanan
              segera diproses.
            </p>
          </div>

          {/* Detail Transaksi */}
          <div className="p-8 space-y-6">
            <div className="bg-muted/30 p-4 rounded-xl border border-border flex justify-between items-center">
              <div>
                <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mb-1">
                  Total Tagihan
                </p>
                <p className="text-2xl font-black text-primary">
                  Rp {Number(order.amount).toLocaleString("id-ID")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 text-sm">
              <DetailRow
                label="Order ID"
                value={`TRX-${order.id.toString().padStart(5, "0")}`}
              />
              <DetailRow
                label="Game"
                value={order.game?.title || "Unknown Game"}
              />
              <DetailRow label="Item" value={order.nominal?.label || "-"} />
              <DetailRow label="User ID" value={order.userId} highlight />
              {order.zoneId && (
                <DetailRow label="Zone ID" value={order.zoneId} highlight />
              )}
              <DetailRow
                label="Metode"
                value={order.paymentMethod.toUpperCase()}
              />
              <DetailRow
                label="Waktu Order"
                value={new Date(order.createdAt!).toLocaleString("id-ID")}
              />
            </div>

            {/* Tombol Aksi */}
            <div className="pt-4 space-y-3">
              {isPending && (
                <Button className="w-full bg-primary text-primary-foreground font-black py-6 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all">
                  <QrCode className="mr-2 w-5 h-5" /> TAMPILKAN KODE BAYAR
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                className="w-full py-6 rounded-xl font-bold border-border hover:bg-muted/50"
              >
                <Link href="/">
                  <ChevronLeft className="mr-2 w-4 h-4" /> Kembali ke Beranda
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Komponen helper agar kode lebih bersih
function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span
        className={`font-bold ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}
