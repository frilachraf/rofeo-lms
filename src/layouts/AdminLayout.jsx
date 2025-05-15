import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppSidebar } from '../components/admin-sidebar';
// import AppSidebar from '../components/theme/Sidebar'
import { ChartAreaInteractive } from "../components/chart-area-interactive"
import { DataTable } from "../components/data-table"
import { SectionCards } from "../components/section-cards"
import { AdminHeader } from "../components/admin-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
export default function AdminLayout() {
  const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  return (
    // <div>
    //   <img src="./logo.webp" alt="s" className='h-12 w-12' />
    //   <h1>Admin Area</h1>
    //   <Outlet />

    // </div>
    <div className=''>
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
    </div>
  );
}
