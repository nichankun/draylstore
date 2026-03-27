"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Headphones, Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle"; // Impor komponen toggle tema
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border py-2"
          : "bg-background border-transparent py-4",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative size-10 transition-transform group-hover:scale-110">
            <Image
              src="https://img.icons8.com/fluency/96/controller.png"
              alt="Logo DraylStore"
              fill
              priority
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground hidden sm:block">
            Drayl<span className="text-primary">Store</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center">
          <Link
            href="/"
            className="text-primary hover:opacity-80 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="#track"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Lacak Pesanan
          </Link>
          <div className="bg-secondary/50 px-4 py-2 rounded-full border border-border flex items-center gap-2 text-muted-foreground">
            <Headphones size={14} className="text-primary animate-pulse" />
            <span className="text-[10px]">Support 24/7</span>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Cari (Mobile/Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary rounded-xl"
            aria-label="Cari Game"
          >
            <Search size={20} />
          </Button>

          {/* Mode Toggle Tema - Berada di sebelah tombol login */}
          <ModeToggle />

          {/* Tombol Masuk - Desktop Only */}
          <Button className="hidden sm:flex bg-primary text-primary-foreground font-black px-6 rounded-full hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all border-none">
            <UserCircle className="mr-2 size-4" /> MASUK
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground rounded-xl"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background border-border"
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-primary font-black tracking-tighter text-2xl">
                    DRAYLSTORE
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-10 uppercase font-black tracking-widest text-sm">
                  <Link
                    href="/"
                    className="text-primary border-b border-border pb-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="#track"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Lacak Pesanan
                  </Link>
                  <Link
                    href="#cs"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Customer Service
                  </Link>

                  {/* Di Mobile, tombol Masuk diletakkan di dalam menu */}
                  <Button className="mt-4 bg-primary text-primary-foreground font-black w-full py-6 rounded-xl">
                    LOGIN / DAFTAR
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
