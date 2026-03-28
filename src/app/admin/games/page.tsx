// src/app/admin/games/page.tsx
import { db } from "@/db";
import { games, nominals } from "@/db/database/schema";
import { desc } from "drizzle-orm";
import { AddGameForm, AddNominalForm } from "@/components/admin/add-data-forms";
import {
  Package,
  Gamepad2,
  Image as ImageIcon,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Wajib: Matikan caching agar data produk langsung update setelah ditambah
export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  // 1. Tarik daftar game
  const gameList = await db.select().from(games).orderBy(desc(games.id));

  // 2. Tarik daftar nominal (untuk menghitung jumlah item per game)
  const allNominals = await db.select().from(nominals);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Halaman */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Package className="text-primary" /> Katalog Produk
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Kelola daftar game, gambar, dan variasi harga diamond yang tampil di
            website.
          </p>
        </div>

        {/* Bagian Atas: Form Tambah Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddGameForm />
          <AddNominalForm games={gameList} />
        </div>

        {/* Bagian Bawah: Tabel Daftar Game yang Tersedia */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border flex items-center gap-3">
            <Gamepad2 className="text-primary w-5 h-5" />
            <h2 className="text-lg font-bold text-foreground">
              Game Tersedia ({gameList.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground border-b border-border uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID / Gambar</th>
                  <th className="px-6 py-4">Nama Game</th>
                  <th className="px-6 py-4">Kategori / Slug</th>
                  <th className="px-6 py-4">Jumlah Item</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {gameList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-muted-foreground"
                    >
                      Belum ada game di katalog. Silakan tambah di atas.
                    </td>
                  </tr>
                ) : (
                  gameList.map((game) => {
                    // Hitung berapa banyak nominal (diamond) yang dimiliki game ini
                    const totalItems = allNominals.filter(
                      (n) => n.gameId === game.id,
                    ).length;

                    return (
                      <tr
                        key={game.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        {/* Gambar & ID */}
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden relative">
                            {game.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={game.image}
                                alt={game.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="font-bold text-muted-foreground text-xs">
                            ID: {game.id}
                          </div>
                        </td>

                        {/* Nama */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-foreground text-base">
                            {game.title}
                          </div>
                        </td>

                        {/* Kategori & Slug */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-1">
                            {game.category}
                          </span>
                          <div className="text-[11px] text-muted-foreground">
                            /{game.slug}
                          </div>
                        </td>

                        {/* Jumlah Item */}
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">
                            {totalItems} Pilihan Harga
                          </div>
                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-[10px]"
                            >
                              Lihat Item
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
