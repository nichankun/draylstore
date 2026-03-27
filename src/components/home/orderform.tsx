"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Diamond, CreditCard, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NOMINAL_OPTIONS, PAYMENT_METHODS, Nominal } from "@/lib/constants";

export function OrderForm() {
  const [selectedNominal, setSelectedNominal] = useState<Nominal>(
    NOMINAL_OPTIONS[0],
  );
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);

  return (
    <section id="order" className="max-w-7xl mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: User ID */}
          <div className="bg-[#161e31] p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#2a3b56]">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-8 sm:size-10 bg-[#22d3ee] text-[#0b1120] rounded-xl flex items-center justify-center font-black text-lg sm:text-xl">
                1
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                User ID
              </h2>
              <User className="ml-auto text-[#22d3ee]/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="User ID"
                className="w-full bg-[#0b1120]/50 border-2 border-[#2a3b56] rounded-xl py-3 px-4 focus:border-[#22d3ee] outline-none text-white transition-all font-bold"
              />
              <input
                type="text"
                placeholder="Zone ID"
                className="w-full bg-[#0b1120]/50 border-2 border-[#2a3b56] rounded-xl py-3 px-4 focus:border-[#22d3ee] outline-none text-white transition-all font-bold"
              />
            </div>
          </div>

          {/* Step 2: Nominal */}
          <div className="bg-[#161e31] p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#2a3b56]">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-8 sm:size-10 bg-[#22d3ee] text-[#0b1120] rounded-xl flex items-center justify-center font-black text-lg sm:text-xl">
                2
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Nominal
              </h2>
              <Diamond className="ml-auto text-[#22d3ee]/50" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {NOMINAL_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedNominal(item)}
                  className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ${selectedNominal.id === item.id ? "bg-[#22d3ee]/10 border-[#22d3ee]" : "bg-[#0b1120]/30 border-[#2a3b56] hover:border-[#22d3ee]/50"}`}
                >
                  <span className="block font-black text-white text-sm sm:text-base mb-1">
                    {item.label}
                  </span>
                  <span className="text-xs text-[#22d3ee] font-bold">
                    Rp {item.price}
                  </span>
                  {selectedNominal.id === item.id && (
                    <Check
                      className="absolute top-2 right-2 text-[#22d3ee]"
                      size={14}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Pembayaran */}
          <div className="bg-[#161e31] p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border border-[#2a3b56]">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-8 sm:size-10 bg-[#22d3ee] text-[#0b1120] rounded-xl flex items-center justify-center font-black text-lg sm:text-xl">
                3
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Pembayaran
              </h2>
              <CreditCard className="ml-auto text-[#22d3ee]/50" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {PAYMENT_METHODS.map((pay) => (
                <button
                  key={pay.id}
                  onClick={() => setSelectedPayment(pay.id)}
                  className={`bg-white p-3 sm:p-4 rounded-xl border-2 h-14 sm:h-16 flex items-center justify-center relative transition-all ${selectedPayment === pay.id ? "border-[#22d3ee] shadow-lg shadow-[#22d3ee]/20" : "opacity-50 border-transparent hover:opacity-100"}`}
                >
                  <div className="relative h-6 w-16 sm:w-20">
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
          </div>
        </div>

        {/* Sidebar Ringkasan */}
        <aside className="lg:sticky lg:top-28">
          <div className="bg-[#161e31] p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border-t-4 border-t-[#22d3ee] border-x border-b border-[#2a3b56] shadow-2xl">
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-6 pb-4 border-b border-[#2a3b56]">
              Ringkasan
            </h2>
            <div className="space-y-4 mb-8 text-xs font-bold uppercase tracking-widest">
              <div className="flex justify-between">
                <span className="text-slate-400">Game</span>
                <span className="text-white">MLBB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Item</span>
                <span className="text-white">{selectedNominal.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode</span>
                <span className="text-white">{selectedPayment}</span>
              </div>
              <div className="pt-4 sm:pt-6 border-t border-[#2a3b56] flex justify-between items-center text-sm sm:text-base">
                <span className="text-white">Total</span>
                <span className="text-xl sm:text-2xl font-black text-[#22d3ee] tracking-tighter">
                  Rp {selectedNominal.price}
                </span>
              </div>
            </div>
            <Button className="w-full bg-linear-to-r from-[#22d3ee] to-[#818cf8] py-6 sm:py-8 rounded-xl text-[#0b1120] font-black text-base sm:text-lg shadow-xl hover:scale-[1.02] transition-transform border-none">
              <Zap size={20} className="mr-2 fill-current" /> BAYAR SEKARANG
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
