import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TeacherSidebar } from '../components/teacher-sidebar';
// import AppSidebar from '../components/theme/Sidebar'
import { ChartAreaInteractive } from "../components/chart-area-interactive"
import { DataTable } from "../components/data-table"
import { SectionCards } from "../components/section-cards"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function TeacherLayout() {
  const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  return (
    <div className='bg-primary'>
    <SidebarProvider>
      <TeacherSidebar variant="inset" />
      <SidebarInset >
        <SiteHeader />
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
