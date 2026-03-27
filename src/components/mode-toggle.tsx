"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  // 1. Menggunakan resolvedTheme (lebih akurat jika menggunakan mode 'system')
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Mencegah hydration error di React 19
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Placeholder transparan agar layout tidak bergeser (Layout Shift)
  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-muted/20 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative rounded-xl transition-all duration-300",
        "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110 active:scale-95",
        "border border-primary/20 shadow-lg shadow-primary/5",
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Ikon Matahari: Muncul saat Dark Mode (untuk pindah ke Light) */}
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-500 absolute",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0",
        )}
      />

      {/* Ikon Bulan: Muncul saat Light Mode (untuk pindah ke Dark) */}
      <Moon
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-500",
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        )}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
