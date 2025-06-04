import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SignUp, Login, Homepage } from '../pages';
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import AdminOverviewPage from "../pages/AdminOverviewPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AddCoursePage from "../pages/AddCourse";
import TeacherFilesPages from "../pages/TeacherFilesPage";
import LandingPage from "../pages/LandingPage";
import HomeLayout from "../layouts/HomeLayout";
import StudentCoursesPage from "../pages/StudentCoursesPage";
import HomeCoursesPage from "../pages/HomeCoursesPage";
import TestPage from "../pages/TestPage";
import TeacherCoursesPage from "../pages/TeacherCoursesPage";
import TeacherCoursePage from "../pages/TeacherCoursePage";
import TeacherStudentsPage from "../pages/TeacherStudentsPage";
import StudentCourseContentPage from "../pages/StudentCourseContentPage";
import TeachersPage from "../pages/TeachersPage";

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
    element: <Navigate to="/home" replace/>,
  },
  {
    path: '/test',
    element: <TestPage/>,
  },
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: 'home',
        element: <LandingPage />,
      },
      {
        path: 'courses',
        element: <HomeCoursesPage/>,
      },
    ],
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
        element: <div />
      },
      {
        path: 'teachers',
        element: <TeachersPage />
      },
      {
        path: 'courses',
        element: <div />
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
        element: <StudentCoursesPage />
      },
      {
        path: 'courses/:id/content',
        element: <StudentCourseContentPage />
      },
    ]
  },
  {
    path:'/teacher',
    element:<TeacherLayout/>,
    children:[
      {
        path: 'dashboard',
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
            element: <TeacherCoursesPage/>
          },
          {
            path:'add',
            element: <AddCoursePage/>
          },
          {
            path:':courseId/edit',
            element: <TeacherCoursePage/>
          },
        ]
      },
      {
        path: 'students',
        element: <TeacherStudentsPage />
      },
      {
        path:'files',
        element: <TeacherFilesPages/>,
      },
    ],
  },
]);

export default router;
