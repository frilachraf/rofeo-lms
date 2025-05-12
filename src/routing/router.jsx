import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SignUp, Login, Homepage } from '../pages';
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import AdminOverviewPage from "../pages/AdminOverviewPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import { AddCoursePage } from "../pages/AddCourse";
import TeacherFilesPages from "../pages/TeacherFilesPage";

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
    path: "/login-admin",
    element: <AdminLoginPage />,
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
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <AdminOverviewPage/>
      },
      {
        path: 'profile',
        element: <div />
      },
      {
        path: 'students',
        children:[
          {
            path: '',
            element: <div />
          },
          {
            path: ':id/details',
            element: <div />
          },
        ]
      },
      {
        path: 'teachers',
        children:[
          {
            path: '',
            element: <div />
          },
          {
            path: 'add',
            element: <div />
          },
          {
            path: ':id/details',
            element: <div />
          },
        ]
      },
    ]
  },
  {
    path:'/student',
    element:<StudentLayout/>,
    children:[
      {
        path: 'profile',
        element: <div />
      },
      {
        path: 'courses',
        element: <div />
      },
      {
        path: 'courses/:id/',
        element: <div />
      },
    ]
  },
  {
    path:'/teacher',
    element:<TeacherLayout/>,
    children:[
      {
        path: '',
        element: <div />
      },
      {
        path: 'profile',
        element: <div />
      },
      {
        path:'courses',
        children:[
          {
            path:'',
            element: <div/>
          },
          {
            path:'add',
            element: <AddCoursePage/>
          },
          {
            path:':id/details',
            element: <AddCoursePage/>
          },
        ]
      },
      {
        path: 'enrolls',
        element: <div />
      },
      {
        path:'files',
        element: <TeacherFilesPages/>,
      },
    ],
  },
]);

export default router;
