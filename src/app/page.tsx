// src/app/page.tsx
import { Suspense } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { GameCard } from "@/components/home/gamecard";
import { OrderForm } from "@/components/home/orderform";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { games } from "@/db/database/schema";
import { eq, desc } from "drizzle-orm";
import { Metadata } from "next";

/**
 * Metadata SEO Standar 2026
 */
export const metadata: Metadata = {
  title: "DraylStore | Top Up Game Murah, Cepat & Otomatis",
  description:
    "Platform top up game terpercaya dengan sistem otomatis 24 jam. Support MLBB, PC Games, dan Voucher.",
};

export default async function Home() {
  /**
   * Mengambil data game unggulan (Mobile Legends) untuk default OrderForm.
   * Menggunakan relational query Drizzle untuk efisiensi.
   */
  const featuredGame = await db.query.games.findFirst({
    where: eq(games.slug, "mobile-legends"),
    with: {
      nominals: true,
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Section: Katalog Game Populer */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <header className="flex items-center gap-3 mb-10 border-b border-border pb-6">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="https://img.icons8.com/fluency/96/fire-element.png"
                alt="Trending"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">
              Game Terpopuler
            </h2>
          </header>

          <Suspense fallback={<GameGridSkeleton />}>
            <GameList />
          </Suspense>
        </section>

        {/* Section: Form Order Utama */}
        <section className="bg-muted/30 py-16">
          <OrderForm
            nominals={featuredGame?.nominals || []}
            gameSlug={featuredGame?.slug || "mobile-legends"}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

/**
 * GameList - Server Component
 * Mengambil data katalog game secara asinkron.
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
      <div className="py-20 text-center border-2 border-dashed border-border rounded-2xl bg-card/50">
        <p className="text-muted-foreground font-medium">
          Katalog game belum tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {popularGames.map((game) => (
        <GameCard
          key={game.id}
          {...game}
          // Tandai sebagai active jika sesuai dengan featuredGame
          active={game.slug === "mobile-legends"}
        />
      ))}
    </div>
  );
}

/**
 * GameGridSkeleton - UI Loading State
 */
function GameGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-3/4 w-full rounded-2xl" />
          <Skeleton className="h-4 w-2/3 mx-auto rounded-md" />
        </div>
      ))}
    </div>
  );
}
