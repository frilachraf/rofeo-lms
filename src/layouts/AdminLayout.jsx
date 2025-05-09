import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  // const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  return (
    <div>
      <h1>Admin Area</h1>
      <Outlet />
    </div>
  );
}
