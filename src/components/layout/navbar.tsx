import Image from "next/image";
import Link from "next/link";
import { Search, Headphones, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#161e31]/80 backdrop-blur-xl border-b border-[#2a3b56]/50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://img.icons8.com/fluency/96/controller.png"
            alt="Logo DraylStore"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-extrabold tracking-tighter text-white hidden sm:block">
            Drayl<span className="text-[#22d3ee]">Store</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center">
          <Link href="/" className="text-[#22d3ee]">
            Home
          </Link>
          <Link
            href="#track"
            className="hover:text-[#22d3ee] transition-colors text-slate-300"
          >
            Lacak Pesanan
          </Link>
          <div className="bg-[#161e31]/50 px-4 py-1.5 rounded-full border border-[#2a3b56] flex items-center gap-2 text-slate-300">
            <Headphones size={14} className="text-[#22d3ee]" /> CS 24/7
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="text-slate-400 hover:text-white p-2"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <Button className="bg-linear-to-r from-[#22d3ee] to-[#818cf8] px-4 sm:px-6 py-2 rounded-full text-xs font-black text-[#0b1120] hover:opacity-90 transition-opacity border-none">
            MASUK
          </Button>
          <button className="md:hidden text-slate-300 p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
