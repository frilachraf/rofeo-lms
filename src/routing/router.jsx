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
import TeacherProfilePage from "../pages/TeacherProfilePage";
import StudentCourseContentPage from "../pages/StudentCourseContentPage";
import TeachersPage from "../pages/TeachersPage";
import { TeacherOverviewPage } from "../pages/TeacherOverviewPage";
import { StudentProfilePage } from "../pages/StudentProfilePage";
import AdminCoursesPage from "../pages/AdminCoursesPage";
import AdminStudentsPage from "../pages/AdminStudentsPage";
import AdminTeachersPage from "../pages/AdminTeachersPage";
import AdminEditCoursePage from "../pages/AdminEditCoursePage";
import AdminEditTeacherPage from "../pages/AdminEditTeacherPage";
import AdminEditStudentPage from "../pages/AdminEditStudentPage";
import AdminReportsPage from "../pages/AdminReportsPage";
import AdminSettingsPage from "../pages/AdminSettingsPage";
import StudentSignUp from "../pages/StudentSignUp";
import TeacherSignUp from "../pages/TeacherSignUp";
import SignUpChoice from "../pages/SignUpChoice";

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
    element: <TestPage />,
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
        element: <HomeCoursesPage />,
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
    element: <SignUpChoice />,
  },
  {
    path: "/signup/student",
    element: <StudentSignUp />,
  },
  {
    path: "/signup/teacher",
    element: <TeacherSignUp />,
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
        element: <AdminOverviewPage />
      },
      {
        path: 'home',
        element: <AdminOverviewPage />
      },
      {
        path: 'profile',
        element: <div />
      },
      {
        path: 'students',
        children: [
          {
            path: '',
            element: <AdminStudentsPage />
          },
          {
            path: 'edit/:id',
            element: <AdminEditStudentPage />
          }
        ]
      },
      {
        path: 'teachers',
        children: [
          {
            path: '',
            element: <AdminTeachersPage />
          },
          {
            path: 'edit/:id',
            element: <AdminEditTeacherPage />
          }
        ]
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            element: <AdminCoursesPage />
          },
          {
            path: 'edit/:id',
            element: <AdminEditCoursePage />
          }
        ]
      },
      {
        path: 'reports',
        element: <AdminReportsPage />
      },
      {
        path: 'settings',
        element: <AdminSettingsPage />
      },
    ]
  },
  {
    path:'/student',
    element:<StudentLayout />,
    children:[
      {
        path: '',
        element: <Navigate to={'/courses'} replace/>
      },
      {
        path: 'profile',
        element: <StudentProfilePage />
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
    element:<TeacherLayout />,
    children:[
      {
        path: 'dashboard',
        element: <TeacherOverviewPage />
      },
      {
        path: 'profile',
        element: <TeacherProfilePage />
      },
      {
        path:'courses',
        children:[
          {
            path:'',
            element: <TeacherCoursesPage />
          },
          {
            path:'add',
            element: <AddCoursePage />
          },
          {
            path:':courseId/edit',
            element: <TeacherCoursePage />
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