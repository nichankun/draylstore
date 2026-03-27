"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/lib/constants";

interface GameCardProps extends Game {
  active?: boolean;
}

export function GameCard({ title, img, tag, tagColor, active }: GameCardProps) {
  const [imgSrc, setImgSrc] = useState(img);

  return (
    <Link href="#order" className="group relative block">
      <div
        className={`aspect-3/4 rounded-2xl overflow-hidden mb-3 border-2 shadow-xl transition-all duration-300 relative ${active ? "border-[#22d3ee]" : "border-[#2a3b56] group-hover:border-[#22d3ee]"}`}
      >
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          onError={() =>
            setImgSrc(
              `https://placehold.co/600x800/161e31/22d3ee?text=${title}`,
            )
          }
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b1120]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-4 left-4 right-4 bg-[#22d3ee] py-2 px-3 rounded-xl text-center text-[#0b1120] font-black text-[10px] transform translate-y-12 group-hover:translate-y-0 transition-transform tracking-wider">
          TOP UP
        </div>
        {tag && (
          <div
            className={`absolute top-2 right-2 ${tagColor} text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg`}
          >
            {tag}
          </div>
        )}
      </div>
      <h3 className="font-bold text-center text-slate-100 group-hover:text-[#22d3ee] transition-colors truncate text-sm">
        {title}
      </h3>
    </Link>
  );
}
