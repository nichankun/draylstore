// src/components/admin/add-data-forms.tsx
"use client";

import { useFormStatus } from "react-dom";
import { addGame, addNominal } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 1. Impor InferSelectModel dan skema tabel dari Drizzle
import type { InferSelectModel } from "drizzle-orm";
import { games as gamesSchema } from "@/db/database/schema"; // Gunakan alias agar tidak bentrok dengan nama prop

// 2. Ekstrak tipe data persis seperti yang ada di database Anda
type Game = InferSelectModel<typeof gamesSchema>;

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? "Menyimpan..." : text}
    </Button>
  );
}

export function AddGameForm() {
  return (
    <form
      action={addGame}
      className="space-y-4 bg-card p-6 rounded-2xl border border-border"
    >
      <h3 className="text-lg font-bold text-primary">Tambah Game Baru</h3>

      <div className="space-y-2">
        <Label htmlFor="title">Nama Game</Label>
        <Input
          id="title"
          name="title"
          placeholder="Cth: Mobile Legends"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="Cth: mobile-legends"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Input
          id="category"
          name="category"
          placeholder="Cth: popular"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL Gambar</Label>
        <Input
          id="image"
          name="image"
          placeholder="Cth: https://img.icons8.com/..."
          required
        />
      </div>

      <SubmitButton text="Simpan Game" />
    </form>
  );
}

// 3. Gunakan tipe Game[] di sini, selamat tinggal 'any'!
export function AddNominalForm({ games }: { games: Game[] }) {
  return (
    <form
      action={addNominal}
      className="space-y-4 bg-card p-6 rounded-2xl border border-border"
    >
      <h3 className="text-lg font-bold text-primary">Tambah Item / Diamond</h3>

      <div className="space-y-2">
        <Label htmlFor="gameId">Pilih Game (ID)</Label>
        <select
          id="gameId"
          name="gameId"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        >
          <option value="">-- Pilih Game --</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Nama Item</Label>
        <Input
          id="label"
          name="label"
          placeholder="Cth: 86 Diamonds"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Harga (Rp)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Cth: 28500"
          required
        />
      </div>

      <SubmitButton text="Simpan Item" />
    </form>
  );
}
