import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '../components/theme/Sidebar'

export default function AdminLayout() {
  const { role } = useAuth();

  if (role !== 'admin') return <Navigate to="/" replace />;
  return (
    // <div>
    //   <img src="./logo.webp" alt="s" className='h-12 w-12' />
    //   <h1>Admin Area</h1>
    //   <Outlet />

    // </div>
    <SidebarProvider>
    <AppSidebar role={role}/>
    <main className='rounded-x3l border w-full'>
      <header className='sticky top-0 right-0 left-0 p-4'>
        <div className="p-2 px-0">
        <SidebarTrigger className='bg-accent'/>
        </div>
      </header>
      <section className='p-4 '>
        <Outlet />
      </section>
    </main>
  </SidebarProvider>
  );
}
