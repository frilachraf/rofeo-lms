import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TeacherLayout() {
  const { role } = useAuth();

  // if (role !== 'admin') return <Navigate to="/" replace />;
  return (
    <div>
      <h1>Je suis Professeur</h1>
      <Outlet />
    </div>
  );
}
