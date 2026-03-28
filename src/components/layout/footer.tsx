"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

/**
 * Footer Component - Simple & Clean Version
 * Menyelaraskan estetika DraylStore dengan navigasi yang rapi dan informatif.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Brand & Description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                Drayl<span className="text-primary">Store</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left leading-relaxed">
              Platform top up game terpercaya, murah, dan otomatis 24 jam di
              Indonesia. Nikmati layanan terbaik untuk pengalaman gaming Anda.
            </p>
          </div>

          {/* Quick Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <Link
              href="#track"
              className="hover:text-primary transition-colors"
            >
              Lacak Pesanan
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Syarat & Ketentuan
            </Link>
            <Link href="#cs" className="hover:text-primary transition-colors">
              Bantuan
            </Link>
          </nav>

          {/* Social Presence */}
          <div className="flex items-center gap-4">
            <SocialIcon
              href="https://instagram.com"
              src="https://img.icons8.com/fluency/96/instagram-new.png"
              alt="Instagram"
            />
            <SocialIcon
              href="https://wa.me/yournumber"
              src="https://img.icons8.com/fluency/96/whatsapp.png"
              alt="WhatsApp"
            />
          </div>
        </div>

        <Separator className="my-10 opacity-50" />

        {/* Legal & Copyright */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase">
            &copy; {currentYear} Drayl Store Indonesia. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground/60">
            <span>Powered by Next.js 16</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="italic">
              Seluruh logo adalah milik masing-masing pemiliknya.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Helper Component untuk Social Icon agar kode lebih bersih (Clean Code)
 */
function SocialIcon({
  href,
  src,
  alt,
}: {
  href: string;
  src: string;
  alt: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2.5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
    >
      <div className="relative size-5">
        <Image
          src={src}
          fill
          alt={alt}
          sizes="20px"
          className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all object-contain"
        />
      </div>
    </Link>
  );
}
