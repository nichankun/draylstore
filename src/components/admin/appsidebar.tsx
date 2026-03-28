"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Settings,
  Users,
  LogOut, // Import icon LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth"; // Import action logout

const MAIN_MENU = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Semua Transaksi", url: "/admin/transactions", icon: ClipboardList },
  { title: "Katalog Produk", url: "/admin/games", icon: Package },
];

const SYSTEM_MENU = [
  { title: "Pengaturan API", url: "/admin/api-settings", icon: Settings },
  { title: "Kelola Pengguna", url: "/admin/users", icon: Users },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center justify-center border-b">
        <span className="text-xl font-extrabold tracking-tighter text-foreground">
          Drayl<span className="text-primary">Admin</span>
        </span>
      </SidebarHeader>

      <SidebarContent>
        {/* Grup Menu Utama */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_MENU.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grup Menu Sistem */}
        <SidebarGroup>
          <SidebarGroupLabel>Sistem</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SYSTEM_MENU.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 space-y-4">
        {/* Profil User */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
            IH
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-foreground leading-none mb-1 truncate">
              Imam Hayatul
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">
              Super Admin
            </p>
          </div>
        </div>

        {/* Tombol Logout */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors h-9 px-3"
          onClick={() => logout()} // Panggil fungsi logout
        >
          <LogOut size={18} />
          <span className="font-semibold text-xs">Keluar Sesi</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
