import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#161e31] py-12 border-t border-[#2a3b56] mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mb-4">
          &copy; {new Date().getFullYear()} Drayl Store Indonesia
        </p>
        <div className="flex justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
          <Image
            src="https://img.icons8.com/fluency/96/instagram-new.png"
            width={24}
            height={24}
            alt="Instagram"
          />
          <Image
            src="https://img.icons8.com/fluency/96/whatsapp.png"
            width={24}
            height={24}
            alt="WhatsApp"
          />
        </div>
      </div>
    </footer>
  );
}
