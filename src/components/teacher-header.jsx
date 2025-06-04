import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTeacherAccountById } from "../services/teacherService";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DotsThreeVertical, UserCircle } from "@phosphor-icons/react";
export function TeacherHeader() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [teacherDetails, setTeacherDetails] = useState(null)
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const { data } = await getTeacherAccountById(user?.id)
      setTeacherDetails(data)
      console.log('teacher',data)
    }
    fetchTeacherDetails()
  }, [user?.id])
  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium"></h1>
        <div className="ml-auto flex items-center gap-2">
          {
          <DropdownMenu>
          <DropdownMenuTrigger className='cursor-pointer flex gap-2 items-center '>
            {/* <Avatar className="w-10 h-10">
              <AvatarImage src={teacherDetails?.avatar} />
              <AvatarFallback>
                {user?.full_name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar> */}
            {/* <DotsThreeVertical weight="bold" className="w-5 h-5"/>   */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> navigate('/teacher/profile')} className='cursor-pointer'>
              <Link to="/teacher/profile">Profile</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
            <DropdownMenuItem onClick={()=>signOut()} className='cursor-pointer'>              
              Logout
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          }

        </div>
      </div>
    </header>
  );
}
