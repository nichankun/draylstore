"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Diamond, CreditCard, Check, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/lib/constants";
import { createOrder } from "@/app/actions/order";
import { useFormStatus } from "react-dom";

// 1. Definisikan tipe nominal agar sinkron dengan database
interface Nominal {
  id: number;
  label: string;
  price: string;
}

interface OrderFormProps {
  nominals: Nominal[]; // Data ini akan dikirim dari page.tsx (Server Component)
  gameSlug: string;
}

export function OrderForm({ nominals, gameSlug }: OrderFormProps) {
  // Gunakan nominal pertama sebagai default jika data tersedia
  const [selectedNominal, setSelectedNominal] = useState<Nominal | null>(
    nominals.length > 0 ? nominals[0] : null,
  );
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);

  return (
    <section id="order" className="max-w-7xl mx-auto px-4 pb-24">
      <form
        action={createOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
      >
        {/* Input Tersembunyi: Sangat penting untuk mengirim data state ke Server Action */}
        <input
          type="hidden"
          name="nominalId"
          value={selectedNominal?.id || ""}
        />
        <input
          type="hidden"
          name="amount"
          value={selectedNominal?.price || ""}
        />
        <input type="hidden" name="paymentMethod" value={selectedPayment} />
        <input type="hidden" name="gameSlug" value={gameSlug} />

        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: User ID */}
          <Card className="p-6 sm:p-8 rounded-[2rem] border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="size-10 rounded-xl flex items-center justify-center font-black text-xl">
                1
              </Badge>
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">
                Data Akun
              </h2>
              <User className="ml-auto text-primary/40" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="userId"
                required
                placeholder="Masukkan User ID"
                className="h-12 bg-background/50 border-2 border-border focus:border-primary font-bold"
              />
              <Input
                name="zoneId"
                placeholder="Zone ID / Server"
                className="h-12 bg-background/50 border-2 border-border focus:border-primary font-bold"
              />
            </div>
          </Card>

          {/* Step 2: Nominal - Dinamis dari Database */}
          <Card className="p-6 sm:p-8 rounded-[2rem] border-border bg-card/50">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="size-10 rounded-xl flex items-center justify-center font-black text-xl">
                2
              </Badge>
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">
                Pilih Item
              </h2>
              <Diamond className="ml-auto text-primary/40" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {nominals.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedNominal(item)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group",
                    selectedNominal?.id === item.id
                      ? "bg-primary/10 border-primary"
                      : "bg-background/40 border-border hover:border-primary/50",
                  )}
                >
                  <span className="block font-black text-foreground text-sm mb-1">
                    {item.label}
                  </span>
                  <span className="text-xs text-primary font-bold">
                    Rp {item.price}
                  </span>
                  {selectedNominal?.id === item.id && (
                    <Check
                      className="absolute top-2 right-2 text-primary"
                      size={14}
                    />
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Step 3: Pembayaran */}
          <Card className="p-6 sm:p-8 rounded-[2rem] border-border bg-card/50">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="size-10 rounded-xl flex items-center justify-center font-black text-xl">
                3
              </Badge>
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">
                Metode Pembayaran
              </h2>
              <CreditCard className="ml-auto text-primary/40" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {PAYMENT_METHODS.map((pay) => (
                <button
                  key={pay.id}
                  type="button"
                  onClick={() => setSelectedPayment(pay.id)}
                  className={cn(
                    "bg-white p-4 rounded-2xl border-2 h-16 flex items-center justify-center relative transition-all",
                    selectedPayment === pay.id
                      ? "border-primary shadow-lg shadow-primary/20 scale-105"
                      : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100",
                  )}
                >
                  <div className="relative h-6 w-20">
                    <Image
                      src={pay.logo}
                      alt={pay.id}
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Ringkasan */}
        <aside className="lg:sticky lg:top-28">
          <Card className="p-6 sm:p-8 rounded-[2rem] border-t-4 border-t-primary border-border bg-card shadow-2xl">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight mb-6 pb-4 border-b border-border">
              Ringkasan
            </h2>
            <div className="space-y-4 mb-8 text-xs font-bold uppercase tracking-widest">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Layanan</span>
                <span className="text-foreground">
                  {gameSlug.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item</span>
                <span className="text-foreground">
                  {selectedNominal?.label || "-"}
                </span>
              </div>
              <div className="pt-6 border-t border-border flex justify-between items-center">
                <span className="text-foreground text-sm">Total</span>
                <span className="text-2xl font-black text-primary tracking-tighter">
                  Rp {selectedNominal?.price || "0"}
                </span>
              </div>
            </div>

            <SubmitButton />
          </Card>
        </aside>
      </form>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className={cn(
        "w-full py-8 rounded-2xl text-primary-foreground font-black text-lg shadow-xl transition-all",
        // Menggunakan sintaks Tailwind CSS 4 gradient yang stabil
        "bg-linear-to-r from-primary to-blue-600 hover:scale-[1.02] active:scale-95",
      )}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 animate-spin" />
          MEMPROSES...
        </>
      ) : (
        <>
          <Zap size={20} className="mr-2 fill-current" />
          BAYAR SEKARANG
        </>
      )}
    </Button>
  );
}
