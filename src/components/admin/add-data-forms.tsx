"use client";

import { useFormStatus } from "react-dom";
import {
  PlusCircle,
  Gamepad2,
  Diamond,
  Loader2,
  Save,
  Link as LinkIcon,
} from "lucide-react";
import { addGame, addNominal } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { InferSelectModel } from "drizzle-orm";
import { games as gamesSchema } from "@/db/database/schema";

type Game = InferSelectModel<typeof gamesSchema>;

/**
 * --- SUB-COMPONENT: FORM FIELD WRAPPER ---
 * Menjaga konsistensi jarak antara Label dan Input
 */
const FormField = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label
      htmlFor={htmlFor}
      className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80"
    >
      {label}
    </Label>
    {children}
  </div>
);

/**
 * --- SUB-COMPONENT: SUBMIT BUTTON ---
 */
function SubmitButton({
  text,
  icon: Icon,
}: {
  text: string;
  icon: React.ElementType;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-11 rounded-xl font-bold transition-all active:scale-[0.98] shadow-sm"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Menyimpan...
        </>
      ) : (
        <>
          <Icon className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
}

/**
 * --- FORM: TAMBAH GAME BARU ---
 */
export function AddGameForm() {
  return (
    <form
      action={addGame}
      className="space-y-6 bg-card p-6 rounded-2xl border-2 border-border shadow-sm"
    >
      <header className="flex items-center gap-2 pb-4 border-b">
        <Gamepad2 className="text-primary h-5 w-5" />
        <h3 className="text-lg font-bold tracking-tight uppercase">
          Tambah Game
        </h3>
      </header>

      <div className="grid gap-5">
        <FormField label="Nama Game" htmlFor="title">
          <Input
            id="title"
            name="title"
            placeholder="Contoh: Mobile Legends"
            required
            className="h-11 rounded-xl bg-background border-border focus-visible:ring-primary/20"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Slug (URL)" htmlFor="slug">
            <Input
              id="slug"
              name="slug"
              placeholder="mobile-legends"
              required
              className="h-11 rounded-xl bg-background border-border focus-visible:ring-primary/20"
            />
          </FormField>

          <FormField label="Kategori" htmlFor="category">
            <Input
              id="category"
              name="category"
              placeholder="Contoh: popular"
              required
              className="h-11 rounded-xl bg-background border-border focus-visible:ring-primary/20"
            />
          </FormField>
        </div>

        <FormField label="URL Gambar" htmlFor="image">
          <div className="relative group">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="image"
              name="image"
              placeholder="https://img.icons8.com/..."
              required
              className="h-11 pl-10 rounded-xl bg-background border-border focus-visible:ring-primary/20"
            />
          </div>
        </FormField>
      </div>

      <SubmitButton text="Simpan Katalog" icon={Save} />
    </form>
  );
}

/**
 * --- FORM: TAMBAH ITEM / NOMINAL ---
 */
export function AddNominalForm({ games }: { games: Game[] }) {
  return (
    <form
      action={addNominal}
      className="space-y-6 bg-card p-6 rounded-2xl border-2 border-border shadow-sm"
    >
      <header className="flex items-center gap-2 pb-4 border-b">
        <Diamond className="text-primary h-5 w-5" />
        <h3 className="text-lg font-bold tracking-tight uppercase">
          Tambah Item
        </h3>
      </header>

      <div className="grid gap-5">
        <FormField label="Pilih Game" htmlFor="gameId">
          <div className="relative">
            <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <select
              id="gameId"
              name="gameId"
              required
              defaultValue=""
              className={cn(
                "flex h-11 w-full rounded-xl border-2 border-border bg-background pl-10 pr-3 py-2 text-sm appearance-none",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer font-medium",
              )}
            >
              <option value="" disabled>
                Pilih Game Tujuan
              </option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
              <PlusCircle className="h-4 w-4 rotate-45" />
            </div>
          </div>
        </FormField>

        <FormField label="Nama Item / Nominal" htmlFor="label">
          <Input
            id="label"
            name="label"
            placeholder="Contoh: 86 Diamonds (77 + 9 Bonus)"
            required
            className="h-11 rounded-xl bg-background border-border focus-visible:ring-primary/20"
          />
        </FormField>

        <FormField label="Harga Jual (Rp)" htmlFor="price">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground group-focus-within:text-primary transition-colors">
              Rp
            </span>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="25000"
              required
              className="h-11 pl-10 rounded-xl bg-background border-border focus-visible:ring-primary/20 font-bold"
            />
          </div>
        </FormField>
      </div>

      <SubmitButton text="Publish Produk" icon={PlusCircle} />
    </form>
  );
}
