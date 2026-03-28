"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  id: number;
  title: string;
  image: string;
  slug: string;
  category?: string;
  active?: boolean;
}

/**
 * GameCard Component - Simple & Clean Version
 * Menampilkan kartu game dengan hover effect yang minimalis dan performa optimal.
 */
export function GameCard({
  title,
  image,
  slug,
  category,
  active,
}: GameCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(image);

  return (
    <Link href={`/details/${slug}`} className="group block">
      <div
        className={cn(
          "relative aspect-3/4 overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-muted shadow-sm",
          active
            ? "border-primary ring-2 ring-primary/10 shadow-md"
            : "border-border group-hover:border-primary/50 group-hover:shadow-md",
        )}
      >
        {/* Gambar Game */}
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          priority={active}
          onError={() =>
            setImgSrc(
              `https://placehold.co/600x800/1e293b/ffffff?text=${encodeURIComponent(title)}`,
            )
          }
        />

        {/* Overlay Minimalis saat Hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Label Aksi (Muncul dari Bawah) */}
        <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-lg bg-primary py-2 text-center text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
            Top Up Sekarang
          </div>
        </div>

        {/* Badge Kategori */}
        {category && (
          <div className="absolute top-2.5 right-2.5">
            <Badge
              variant={
                category.toLowerCase() === "popular" ? "default" : "secondary"
              }
              className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-tight shadow-sm"
            >
              {category}
            </Badge>
          </div>
        )}
      </div>

      {/* Judul Game */}
      <div className="mt-2.5 px-1">
        <h3 className="truncate text-center text-sm font-bold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
      </div>
    </Link>
  );
}
