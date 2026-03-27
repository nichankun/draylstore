"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utilitas standar shadcn
import { Badge } from "@/components/ui/badge"; // Gunakan komponen Badge dari shadcn

// 1. Interface disesuaikan dengan skema Database (bukan constants.ts)
interface GameCardProps {
  id: number;
  title: string;
  image: string; // Menggunakan 'image' sesuai standar DB
  slug: string; // Penting untuk routing dinamis
  category?: string;
  active?: boolean;
}

export function GameCard({
  title,
  image,
  slug,
  category,
  active,
}: GameCardProps) {
  // State untuk fallback image jika URL dari DB bermasalah
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Link href={`/details/${slug}`} className="group relative block">
      <div
        className={cn(
          // Menggunakan aspek rasio modern & variabel border dari tema
          "aspect-3/4 rounded-2xl overflow-hidden mb-3 border-2 shadow-xl transition-all duration-300 relative bg-muted",
          active
            ? "border-primary shadow-primary/20 ring-2 ring-primary/20"
            : "border-border group-hover:border-primary",
        )}
      >
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          // Next.js 16 optimization: data fetching & error handling lebih robust
          onError={() =>
            setImgSrc(
              `https://placehold.co/600x800/1e293b/ffffff?text=${encodeURIComponent(title)}`,
            )
          }
        />

        {/* Overlay gradient menggunakan variabel tema background */}
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tombol aksi yang muncul saat hover */}
        <div className="absolute bottom-4 left-4 right-4 bg-primary py-2.5 px-3 rounded-xl text-center text-primary-foreground font-bold text-[11px] transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300 ease-out tracking-wider">
          TOP UP SEKARANG
        </div>

        {/* Tag/Category menggunakan komponen Badge shadcn */}
        {category && (
          <div className="absolute top-3 right-3">
            <Badge
              variant={category === "popular" ? "default" : "secondary"}
              className="font-black text-[9px] px-2 py-0.5 shadow-lg uppercase"
            >
              {category}
            </Badge>
          </div>
        )}
      </div>

      {/* Title menggunakan variabel text-foreground agar support dark/light mode */}
      <h3 className="font-semibold text-center text-foreground group-hover:text-primary transition-colors truncate text-sm px-1">
        {title}
      </h3>
    </Link>
  );
}
