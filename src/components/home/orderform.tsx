"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Diamond,
  CreditCard,
  Check,
  Zap,
  Loader2,
  ShoppingCart,
  LucideIcon,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS, PaymentMethod } from "@/lib/constants";
import { createOrder } from "@/app/actions/order";
import { useFormStatus } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

// --- Interfaces ---
interface Nominal {
  id: number;
  label: string;
  price: string;
}

interface OrderFormProps {
  nominals: Nominal[];
  gameSlug: string;
}

interface FormSectionProps {
  step: number;
  title: string;
  icon: React.ReactElement<LucideIcon>;
  children: React.ReactNode;
}

export function OrderForm({ nominals, gameSlug }: OrderFormProps) {
  // State untuk Data Pilihan
  const [selectedNominal, setSelectedNominal] = useState<Nominal | null>(
    nominals.length > 0 ? nominals[0] : null,
  );
  const [selectedPayment, setSelectedPayment] = useState<string>(
    PAYMENT_METHODS[0].id,
  );

  // State untuk Input (Digunakan untuk Konfirmasi di Modal)
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Ambil data pembayaran yang aktif untuk ringkasan
  const activePayment = PAYMENT_METHODS.find((p) => p.id === selectedPayment);

  return (
    <section id="order" className="max-w-7xl mx-auto px-4 pb-24 py-10">
      <form
        action={createOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
      >
        {/* Hidden Inputs untuk Server Action */}
        <input
          type="hidden"
          name="nominalId"
          value={selectedNominal?.id ?? ""}
        />
        <input
          type="hidden"
          name="amount"
          value={selectedNominal?.price ?? ""}
        />
        <input type="hidden" name="paymentMethod" value={selectedPayment} />
        <input type="hidden" name="gameSlug" value={gameSlug} />

        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: User ID */}
          <FormSection step={1} title="Data Akun" icon={<User size={20} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="userId"
                placeholder="Masukkan User ID"
                required
                className="h-12"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <Input
                name="zoneId"
                placeholder="Zone ID / Server"
                className="h-12"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
              />
            </div>
          </FormSection>

          {/* Step 2: Nominal */}
          <FormSection step={2} title="Pilih Item" icon={<Diamond size={20} />}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nominals.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedNominal(item)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all relative flex flex-col group",
                    selectedNominal?.id === item.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50",
                  )}
                >
                  <span className="font-bold text-sm">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    Rp {item.price}
                  </span>
                  {selectedNominal?.id === item.id && (
                    <Check
                      className="absolute top-2 right-2 text-primary"
                      size={16}
                    />
                  )}
                </button>
              ))}
            </div>
          </FormSection>

          {/* Step 3: Payment */}
          <FormSection
            step={3}
            title="Metode Pembayaran"
            icon={<CreditCard size={20} />}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PAYMENT_METHODS.map((pay: PaymentMethod) => (
                <button
                  key={pay.id}
                  type="button"
                  onClick={() => setSelectedPayment(pay.id)}
                  className={cn(
                    "p-3 rounded-xl border-2 h-16 flex items-center justify-center transition-all bg-white",
                    selectedPayment === pay.id
                      ? "border-primary ring-1 ring-primary shadow-sm"
                      : "border-border opacity-60 hover:opacity-100",
                  )}
                >
                  <div className="relative h-8 w-full">
                    <Image
                      src={pay.logo}
                      alt={pay.name}
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </FormSection>
        </div>

        {/* Sidebar Ringkasan & Submit */}
        <aside className="lg:sticky lg:top-24">
          <Card className="p-6 rounded-2xl shadow-sm border-2">
            <div className="flex items-center gap-2 mb-6 font-bold uppercase text-sm tracking-wider border-b pb-4">
              <ShoppingCart size={18} />
              Ringkasan Pesanan
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Layanan</span>
                <span className="font-medium uppercase">
                  {gameSlug.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Item</span>
                <span className="font-medium">
                  {selectedNominal?.label ?? "-"}
                </span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-sm font-bold">Total</span>
                <span className="text-xl font-bold text-primary">
                  Rp {selectedNominal?.price ?? "0"}
                </span>
              </div>
            </div>

            {/* Dialog Konfirmasi Pembayaran */}
            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  disabled={!userId || !selectedNominal}
                  className="w-full h-14 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                >
                  <Zap size={20} fill="currentColor" className="mr-2" />
                  BAYAR SEKARANG
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-106.25 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Konfirmasi Pesanan
                  </DialogTitle>
                  <DialogDescription>
                    Periksa kembali data akun Anda agar tidak terjadi kesalahan
                    top up.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="bg-muted/50 p-5 rounded-2xl space-y-3 border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">User ID</span>
                      <span className="font-bold text-primary">
                        {userId} {zoneId ? `(${zoneId})` : ""}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Layanan</span>
                      <span className="font-bold uppercase">{gameSlug}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-3">
                      <span className="text-muted-foreground">Item</span>
                      <span className="font-bold">
                        {selectedNominal?.label}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Metode</span>
                      <span className="font-bold uppercase">
                        {activePayment?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm font-bold">Harga</span>
                      <span className="text-lg font-black text-primary">
                        Rp {selectedNominal?.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 text-xs leading-relaxed">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p>
                      Pastikan User ID sudah benar. Kesalahan pengiriman akibat
                      kelalaian input adalah tanggung jawab pembeli.
                    </p>
                  </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-col gap-2">
                  <SubmitButton />
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full rounded-xl"
                    onClick={() => setIsConfirmOpen(false)}
                  >
                    Kembali ke Form
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Card>
        </aside>
      </form>
    </section>
  );
}

// --- Sub-Components ---

function FormSection({ step, title, icon, children }: FormSectionProps) {
  return (
    <Card className="p-6 rounded-2xl border-2 shadow-sm bg-card/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
          {step}
        </div>
        <h2 className="font-bold text-lg uppercase tracking-tight">{title}</h2>
        <div className="ml-auto text-muted-foreground">{icon}</div>
      </div>
      {children}
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full h-14 rounded-xl font-bold text-lg shadow-md"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={20} /> MEMPROSES...
        </div>
      ) : (
        "KONFIRMASI & BAYAR"
      )}
    </Button>
  );
}
