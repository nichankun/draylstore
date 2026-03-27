import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

// Optimasi Font: Menggunakan Geist sebagai font utama standar 2026
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Metadata API: Mengganti data generic dengan brand DraylStore
export const metadata: Metadata = {
  title: {
    default: "DraylStore - Top Up Game Murah & Otomatis",
    template: "%s | DraylStore",
  },
  description:
    "Layanan top up game terpercaya dengan sistem otomatis 24 jam. Proses instan dan aman.",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

// Viewport: Terpisah dari metadata di versi terbaru untuk performa
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth antialiased",
        geistSans.variable,
        geistMono.variable,
      )}
    >
      <body
        className={cn(
          "min-h-full font-sans bg-background text-foreground",
          "selection:bg-primary/30 selection:text-primary",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Gaming vibe
          enableSystem={false} // Mencegah script deteksi sistem yang bermasalah
          enableColorScheme={false} // Jaminan bebas error "script tag"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
