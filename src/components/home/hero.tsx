// src/components/home/hero.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Gunakan komponen Badge standar
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <header className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-border/50 bg-card">
          {/* Container Image dengan Rasio yang Konsisten */}
          <div className="relative h-75 sm:h-100 md:h-112.5 w-full">
            <Image
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600"
              alt="Promo Banner"
              fill
              className="object-cover"
              priority
              // Optimasi LCP untuk 2026
              sizes="(max-width: 1280px) 100vw, 1280px"
            />

            {/* Overlay Gradient menggunakan variabel background tema */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
          </div>

          {/* Konten Hero */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16 pb-10 sm:pb-14">
            <div className="max-w-2xl space-y-4">
              {/* Badge Promo menggunakan standar shadcn */}
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] rounded-full"
              >
                SPECIAL OFFER
              </Badge>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-sm">
                Bonus Diamond MLBB <br />
                <span className="text-primary">Hingga 20%!</span>
              </h1>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className={cn(
                    "bg-primary text-primary-foreground font-black px-8 py-7 rounded-2xl",
                    "hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25",
                  )}
                >
                  KLAIM SEKARANG
                </Button>

                {/* Opsi tombol kedua untuk meningkatkan CTR */}
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/5 backdrop-blur-md border-white/20 text-white font-bold px-8 py-7 rounded-2xl hover:bg-white/10"
                >
                  LIHAT PROMO LAIN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
