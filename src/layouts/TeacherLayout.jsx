import { Navigate, Outlet } from 'react-router-dom';
import { TeacherSidebar } from '../components/teacher-sidebar';
// import AppSidebar from '../components/theme/Sidebar'
import { TeacherHeader } from "../components/teacher-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function TeacherLayout() {
  const { user, role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  // if(!isLoading && role && role !== 'teacher') <Navigate to="/" />
  // if(!isLoading && role && role !== 'teache') return <>you don't have access </>
  // if(isLoading) return (<>loading...</>)
  // if(role !== 'teacher') return (<>
  //   you don't have access
  //   </>)
  // if(isLoading) return (<>loading...</>)
  if(!user || role != 'teacher') return  <Navigate to="/login" replace />
  return (
    <div className='bg-muted'>
    <SidebarProvider>
      <TeacherSidebar variant="inset" />
      <SidebarInset >
        <TeacherHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 px-10 py-5">
            <Outlet/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    <ToastContainer />
    </div>
  );
}
