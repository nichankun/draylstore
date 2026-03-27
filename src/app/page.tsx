import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { GameCard } from "@/components/home/gamecard";
import { OrderForm } from "@/components/home/orderform";
import { POPULAR_GAMES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="bg-[#0b1120] text-slate-300 font-sans antialiased min-h-screen flex flex-col selection:bg-[#22d3ee] selection:text-[#0b1120]">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Popular Games Section */}
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 border-b border-[#2a3b56] pb-4 sm:pb-6">
            <Image
              src="https://img.icons8.com/fluency/96/fire-element.png"
              alt="Hot"
              width={32}
              height={32}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter">
              Game Terpopuler
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {POPULAR_GAMES.map((game) => (
              <GameCard key={game.id} {...game} active={game.id === "mlbb"} />
            ))}
          </div>
        </section>

        <OrderForm />
      </main>

      <Footer />
    </div>
  );
}
