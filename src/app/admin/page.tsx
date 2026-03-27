import { DashboardStats } from "@/components/admin/dashboardstats";
import { TransactionTable } from "@/components/admin/transactiontable";

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <DashboardStats />

      <div className="p-6 pt-0">
        <div className="max-w-7xl mx-auto">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}
