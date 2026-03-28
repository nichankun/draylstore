"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Headphones, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription, // Tambahkan import ini
  SheetTrigger,
} from "@/components/ui/sheet";
import { searchGamesAction, SearchResult } from "@/app/actions/game";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.length > 1) {
        const data = await searchGamesAction(searchQuery);
        setResults(data);
      } else {
        setResults([]);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-border py-2"
            : "bg-background border-transparent py-4",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative size-9 transition-transform group-hover:scale-110">
              <Image
                src="https://img.icons8.com/fluency/96/controller.png"
                alt="Logo"
                fill
                priority
                sizes="36px"
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Drayl<span className="text-primary">Store</span>
            </span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <nav className="flex gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-primary hover:opacity-80 transition-opacity"
              >
                Beranda
              </Link>
              <Link
                href="#track"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Lacak Pesanan
              </Link>
            </nav>
            <div className="h-4 w-px bg-border" />
            <div className="bg-muted/50 px-4 py-1.5 rounded-full border border-border flex items-center gap-2 text-muted-foreground">
              <Headphones size={14} className="text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Support 24/7
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-xl"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Cari Game"
            >
              <Search size={20} />
            </Button>

            <ModeToggle />

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-75">
                  <SheetHeader className="text-left border-b pb-4">
                    <SheetTitle className="text-primary font-bold tracking-tight text-xl">
                      DRAYLSTORE
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Menu navigasi utama DraylStore
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex flex-col gap-5 mt-8 font-medium text-sm">
                    <Link href="/" className="text-primary">
                      Beranda
                    </Link>
                    <Link href="#track" className="text-muted-foreground">
                      Lacak Pesanan
                    </Link>
                    <Link
                      href="#cs"
                      className="text-muted-foreground border-t pt-5"
                    >
                      Hubungi Kami
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* MODAL PENCARIAN (Overlay dari Atas) */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="w-full border-b shadow-2xl pb-10">
          {/* PERBAIKAN: Header wajib untuk aksesibilitas */}
          <SheetHeader className="sr-only">
            <SheetTitle>Pencarian Game</SheetTitle>
            <SheetDescription>
              Cari katalog game favorit Anda di DraylStore
            </SheetDescription>
          </SheetHeader>

          <div className="max-w-3xl mx-auto pt-10 px-4">
            <div className="relative flex items-center">
              <Search
                className="absolute left-4 text-muted-foreground"
                size={20}
              />
              <Input
                autoFocus
                placeholder="Cari game favorit Anda..."
                className="h-14 pl-12 pr-12 text-lg font-medium rounded-2xl border-2 focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={16} className="text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="mt-6 space-y-2">
              {results.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Hasil Pencarian
                  </p>
                  {results.map((game) => (
                    <Link
                      key={game.slug}
                      href={`/details/${game.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
                    >
                      <span className="font-bold text-foreground">
                        {game.title}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  ))}
                </div>
              ) : searchQuery.length > 1 ? (
                <p className="text-center py-10 text-muted-foreground text-sm">
                  Game &quot;{searchQuery}&quot; tidak ditemukan.
                </p>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-muted-foreground text-sm font-medium italic">
                    Ketik nama game untuk mencari katalog...
                  </p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
