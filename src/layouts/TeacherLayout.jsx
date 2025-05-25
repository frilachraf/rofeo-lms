import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TeacherSidebar } from '../components/teacher-sidebar';
// import AppSidebar from '../components/theme/Sidebar'
import { ChartAreaInteractive } from "../components/chart-area-interactive"
import { DataTable } from "../components/data-table"
import { SectionCards } from "../components/section-cards"
import { TeacherHeader } from "../components/teacher-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ToastContainer } from 'react-toastify';

export default function TeacherLayout() {
  const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  return (
    <div className='bg-muted'>
    <SidebarProvider>
      <TeacherSidebar variant="inset" />
      <SidebarInset >
        <TeacherHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    <ToastContainer />
    </div>
  );
}
