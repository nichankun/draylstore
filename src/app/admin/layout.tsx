import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/appsidebar"; // Pastikan Case Sensitive

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground min-h-screen flex flex-col overflow-hidden w-full selection:bg-primary/30 selection:text-primary">
        {/* Konten utama (DashboardStats, TransactionTable, dll) */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
