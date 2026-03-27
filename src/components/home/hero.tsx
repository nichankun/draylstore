import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <header className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#161e31]">
          <div className="relative h-64 sm:h-80 md:h-100 w-full">
            <Image
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200"
              alt="Promo Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0b1120] via-[#0b1120]/40 to-transparent" />
          </div>
          <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-12 max-w-lg">
            <div className="bg-[#f472b6]/20 text-[#f472b6] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3 sm:mb-4 border border-[#f472b6]/30 inline-block">
              SPECIAL OFFER
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tighter">
              Bonus Diamond MLBB <br /> Hingga 20%!
            </h1>
            <Button className="bg-white text-[#0b1120] font-black px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl hover:bg-[#22d3ee] transition-all border-none">
              KLAIM SEKARANG
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
