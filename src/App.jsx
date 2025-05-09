import { Button } from "@/components/ui/button"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import { RouterProvider } from "react-router-dom"
import router from "./routing/router"
import './global.css'

function App() {
  return (
    <AuthProvider>
      <ToastContainer 
        // position="top-center"
        // autoClose={5000}
        // hideProgressBar={false}
        // newestOnTop={false}
        closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        draggable
        // pauseOnHover
        // theme="light"
      />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
