"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Hero Component - Clean & Simple Version
 * Mengikuti standar desain "DraylStore" yang bersih dan profesional.
 */
export function Hero() {
  return (
    <header className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-border bg-card">
          {/* Container Image dengan Aspect Ratio Standar agar Responsif */}
          <div className="relative aspect-video sm:h-100 md:h-112.5 w-full">
            <Image
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600"
              alt="Promo Banner"
              fill
              className="object-cover"
              priority // Optimasi LCP (Largest Contentful Paint)
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            {/* Overlay Gradient: Diperhalus agar teks tetap terbaca */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Konten Hero */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-12">
            <div className="max-w-2xl space-y-4">
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground border-none px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-md"
              >
                Penawaran Terbatas
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
                Bonus Diamond MLBB <br />
                <span className="text-primary">Hingga 20%!</span>
              </h1>

              <p className="text-white/80 text-sm sm:text-base max-w-md hidden sm:block">
                Dapatkan keuntungan lebih setiap top up di DraylStore. Proses
                instan, otomatis, dan terpercaya 24 jam.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className={cn(
                    "bg-primary text-primary-foreground font-bold px-8 h-12 sm:h-14 rounded-xl",
                    "hover:bg-primary/90 transition-all shadow-md active:scale-95",
                  )}
                >
                  KLAIM SEKARANG
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white font-bold px-8 h-12 sm:h-14 rounded-xl hover:bg-white/20"
                >
                  LIHAT PROMO
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
