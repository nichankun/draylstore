// src/components/layout/footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"; // npx shadcn add separator

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-foreground">
                Drayl<span className="text-primary">Store</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
              Platform top up game terpercaya, murah, dan otomatis 24 jam
              Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="#track"
              className="hover:text-primary transition-colors"
            >
              Lacak
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Ketentuan
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-all duration-300 group"
            >
              <Image
                src="https://img.icons8.com/fluency/96/instagram-new.png"
                width={20}
                height={20}
                alt="Instagram DraylStore"
                className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </Link>
            <Link
              href="https://wa.me/yournumber"
              target="_blank"
              className="p-2 rounded-full bg-secondary hover:bg-primary/20 transition-all duration-300 group"
            >
              <Image
                src="https://img.icons8.com/fluency/96/whatsapp.png"
                width={20}
                height={20}
                alt="WhatsApp DraylStore"
                className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </Link>
          </div>
        </div>

        <Separator className="bg-border/50 mb-8" />

        {/* Copyright Section */}
        <div className="text-center space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground tracking-[0.3em] uppercase">
            &copy; {currentYear} Drayl Store Indonesia. All Rights Reserved.
          </p>
          <p className="text-[9px] text-muted-foreground/50 italic">
            Seluruh logo dan merek dagang adalah milik masing-masing pemiliknya.
          </p>
        </div>
      </div>
    </footer>
  );
}
