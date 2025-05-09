import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SignUp, Login, Homepage } from '../pages';
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";

// import { useAuth } from '../context/AuthContext';

// Wrapper component to handle auth state


// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/homepage",
    element: <Homepage />
  },
  {
    path: '/admin',
    element: 
      <AdminLayout />,
    children: [
      {
        path: '',
        element: <div>Admin Dashboard</div>
      }
    ]
  },
  {
    path:'/student',
    element:<StudentLayout/>,
    children:[]
  },
  {
    path:'/teacher',
    element:<TeacherLayout/>,
    children:[]
  },
]);

export default router;
