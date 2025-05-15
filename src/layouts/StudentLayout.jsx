import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StudentSidebar } from '../components/student-sidebar';
import { StudentHeader } from '../components/student-header';
export default function StudentLayout() {
  const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
   
  return (
    <div className='bg-white'>
    <SidebarProvider className=''>
      <StudentSidebar variant="inset" />
      <SidebarInset className='border '>
        <StudentHeader/>
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
