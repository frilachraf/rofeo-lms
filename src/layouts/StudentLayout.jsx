import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StudentSidebar } from '../components/student-sidebar';
import { StudentHeader } from '../components/student-header';
import { BookOpenIcon, HomeIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react';
import { File } from '@phosphor-icons/react';
export default function StudentLayout() {
  const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  
  return (
    <div className='bg-muted min-h-screen'>
    {/* <SidebarProvider className=''>
      <StudentSidebar variant="inset" />
      <SidebarInset className='border '>
        <StudentHeader/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet/>
            </div>
            </div>
            </SidebarInset>
            </SidebarProvider> */}
    
    <StudentHeader />
    <div className='px-4 sm:px-10 py-4 h-full'>
      <Outlet/>
    </div>

    </div>
  );
}
