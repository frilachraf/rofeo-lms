import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppSidebar } from '../components/admin-sidebar';
// import AppSidebar from '../components/theme/Sidebar'
import { ChartAreaInteractive } from "../components/chart-area-interactive"
import { DataTable } from "../components/data-table"
import { SectionCards } from "../components/section-cards"
import { AdminHeader } from "../components/admin-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toast"

export default function AdminLayout() {
  const { user,role } = useAuth();
  if(!user || role != 'admin') return  <Navigate to="/login" replace />
  return (
    
    <div className='bg-muted'>
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset >
        <AdminHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    <Toaster />
    </div>
  );
}
