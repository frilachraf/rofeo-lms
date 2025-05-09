import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function StudentLayout() {
  const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  return (
    <div>
      <h1>I'm Student</h1>
      <Outlet />
    </div>
  );
}
