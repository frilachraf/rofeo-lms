import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function RoleRedirectLayout() {
  const { user, role } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   if (role === 'admin') return <Navigate to="/admin" replace />;
//   if (role === 'user') return <Navigate to="/user" replace />;

  return <p>Loading...</p>; // Optional fallback
}
