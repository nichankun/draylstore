// src/app/admin/api-settings/page.tsx
import { Save, Server, ShieldCheck, CreditCard, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const dynamic = "force-dynamic";

export default function ApiSettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Server className="text-primary" /> Pengaturan API & Integrasi
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Kelola kunci rahasia (Secret Keys) untuk provider top-up dan payment
            gateway.
            <span className="text-destructive font-semibold ml-1">
              Jangan bagikan halaman ini kepada siapapun.
            </span>
          </p>
        </div>

        {/* 1. Pengaturan Provider (Digiflazz) */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-muted/50 p-5 border-b border-border flex items-center gap-3">
            <ShieldCheck className="text-emerald-500 w-5 h-5" />
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Provider Top-Up (Digiflazz)
              </h2>
              <p className="text-xs text-muted-foreground">
                Konfigurasi API untuk memproses pesanan otomatis.
              </p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="digiUser">Username Digiflazz</Label>
                <Input id="digiUser" defaultValue="draylstore_prod" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="digiKey">Production API Key</Label>
                <Input
                  id="digiKey"
                  type="password"
                  defaultValue="dev-xxxxxxxxxxxxxxxxxxxx"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="digiWebhook">
                Webhook URL (Untuk Set di Digiflazz)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="digiWebhook"
                  readOnly
                  value="https://draylstore.com/api/webhook/digiflazz"
                  className="bg-muted text-muted-foreground"
                />
                <Button variant="outline">Copy</Button>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button className="font-bold">
                <Save className="w-4 h-4 mr-2" /> Simpan Provider
              </Button>
            </div>
          </div>
        </section>

        {/* 2. Pengaturan Payment Gateway (Tripay) */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-muted/50 p-5 border-b border-border flex items-center gap-3">
            <CreditCard className="text-indigo-500 w-5 h-5" />
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Payment Gateway (Tripay)
              </h2>
              <p className="text-xs text-muted-foreground">
                Konfigurasi pembayaran QRIS, E-Wallet, dan Virtual Account.
              </p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="tripayMerchant">Merchant Code</Label>
                <Input id="tripayMerchant" defaultValue="T0001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tripayApi">API Key</Label>
                <Input
                  id="tripayApi"
                  type="password"
                  defaultValue="xxxxxxxxxxxxxxxxxxxx"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tripayPrivate">Private Key</Label>
              <Input
                id="tripayPrivate"
                type="password"
                defaultValue="xxxxxxxxxxxxxxxxxxxx"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button className="font-bold">
                <Save className="w-4 h-4 mr-2" /> Simpan Pembayaran
              </Button>
            </div>
          </div>
        </section>

        {/* 3. Pengaturan Margin / Keuntungan */}
        <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-muted/50 p-5 border-b border-border flex items-center gap-3">
            <Webhook className="text-amber-500 w-5 h-5" />
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Pengaturan Margin Harga
              </h2>
              <p className="text-xs text-muted-foreground">
                Persentase keuntungan otomatis yang ditambahkan ke harga modal
                (Digiflazz).
              </p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2 w-full md:w-1/2">
              <Label htmlFor="margin">Margin Profit (%)</Label>
              <div className="relative">
                <Input
                  id="margin"
                  type="number"
                  defaultValue="15"
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
                  %
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Contoh: Jika harga modal 86 Diamond = Rp 20.000, maka akan
                otomatis dijual seharga Rp 23.000 di web.
              </p>
            </div>
            <div className="flex justify-start pt-2">
              <Button className="font-bold">
                <Save className="w-4 h-4 mr-2" /> Update Margin
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
