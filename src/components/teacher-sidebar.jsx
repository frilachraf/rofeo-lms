import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HouseLine, Heart, Horse, Users, UsersThree, Notebook, ChalkboardTeacher } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { getTeacherAccountById } from "../services/teacherService"
import { useState } from "react"
const data = {
  user: {
    name: "shadcn",
    email:"m@example.com",
    avatar:  "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/teacher/dashboard",
      icon: HouseLine,
    },
    {
      title: "My courses",
      url: "/teacher/courses",
      icon: Notebook,
    },
    {
      title: "Students Enrolled",
      url: "/teacher/students",
      icon: UsersThree,
    },
    
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: IconSettings,
    // },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: IconHelp,
    // },
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: IconSearch,
    // },
  ],
  documents: [
    
    // {
    //   name: "Documents",
    //   url: "#",
    //   icon: IconReport,
    // },
    // {
    //   name: "Word Assistant",
    //   url: "#",
    //   icon: IconFileWord,
    // },
  ],
}

export function TeacherSidebar({
  ...props
}) {

  const { user, signOut } = useAuth()
  const [teacherDetails, setTeacherDetails] = useState(null)
  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const { data } = await getTeacherAccountById(user?.id)
      setTeacherDetails(data)
      console.log('teacher', data)
    }
    fetchTeacherDetails()
  }, [user?.id])
  return (
    <Sidebar collapsible="offcanvas" {...props} className=''>
      <SidebarHeader>
        <SidebarMenu>
        {user &&
          <NavUser user={{
            name: teacherDetails?.full_name ||"shadcn",
            email:  user?.email,
            avatar:  teacherDetails?.avatar || "https://avatar.iran.liara.run/public/boy",
            }
          } /> 
          
        }

          {/* <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="">
                <ChalkboardTeacher className="!size-5 text-primary" />
                <span className="text-base font-semibold text-primary capitalize">{teacherDetails?.full_name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
    </Sidebar>
  );
}
