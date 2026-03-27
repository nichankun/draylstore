// src/app/page.tsx
import Image from "next/image";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { GameCard } from "@/components/home/gamecard";
import { OrderForm } from "@/components/home/orderform";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { games } from "@/db/database/schema";
import { eq, desc } from "drizzle-orm";

// 1. Metadata API: Standar SEO 2026
export const metadata = {
  title: "DraylStore | Top Up Game Murah & Cepat",
  description: "Layanan top up game terpercaya dengan sistem otomatis 24 jam.",
};

export default async function Home() {
  /**
   * 2. Ambil data game utama (Featured) untuk OrderForm.
   * Kita mengambil 'mobile-legends' sebagai default landing page.
   * Gunakan relational query agar nominal harganya ikut terbawa.
   */
  const featuredGame = await db.query.games.findFirst({
    where: eq(games.slug, "mobile-legends"),
    with: {
      nominals: true,
    },
  });

  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Popular Games Section */}
        <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 border-b border-border pb-4 sm:pb-6">
            <Image
              src="https://img.icons8.com/fluency/96/fire-element.png"
              alt="Hot"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
              priority
            />
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter">
              Game Terpopuler
            </h2>
          </div>

          {/* Streaming UI dengan Skeleton */}
          <Suspense fallback={<GameGridSkeleton />}>
            <GameList />
          </Suspense>
        </section>

        {/* 3. Kirim data nominal dan slug ke OrderForm.
          Sekarang form ini dinamis, harga yang muncul adalah harga asli dari DB.
        */}
        <OrderForm
          nominals={featuredGame?.nominals || []}
          gameSlug={featuredGame?.slug || "mobile-legends"}
        />
      </main>

      <Footer />
    </div>
  );
}

/**
 * Server Component untuk Fetching Katalog
 */
async function GameList() {
  const popularGames = await db
    .select()
    .from(games)
    .where(eq(games.category, "popular"))
    .orderBy(desc(games.id))
    .limit(6);

  if (popularGames.length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
        <p className="text-muted-foreground font-medium">
          Belum ada game di kategori populer.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
      {popularGames.map((game) => (
        <GameCard
          key={game.id}
          {...game}
          active={game.slug === "mobile-legends"}
        />
      ))}
    </div>
  );
}

function GameGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-3/4 w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
}
