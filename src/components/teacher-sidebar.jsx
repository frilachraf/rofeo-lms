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
      title: "Tableau de bord",
      url: "/teacher/dashboard",
      icon: HouseLine,
    },
    {
      title: "Mes cours",
      url: "/teacher/courses",
      icon: Notebook,
    },
    {
      title: "Etudiants inscrits",
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
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
    {
      title: "Propositions",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
    {
      title: "Invites IA",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Propositions actives",
          url: "#",
        },
        {
          title: "Archivées",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Aide",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Rechercher",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    
    {
      name: "Documents",
      url: "#",
      icon: IconReport,
    },
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
    }
    fetchTeacherDetails()
  }, [user?.id])
  return (
    <Sidebar collapsible="offcanvas" {...props} className=''>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="">
                <ChalkboardTeacher className="!size-5 text-primary" />
                <span className="text-base font-semibold text-primary capitalize">{teacherDetails?.full_name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <NavMain items={data.navMain} quickLink={{title:'Créer un cours',link:'/'}}/>
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user &&
          <NavUser user={{
            name: teacherDetails?.full_name ||"shadcn",
            email:  user?.email,
            avatar:  teacherDetails?.avatar || "https://avatar.iran.liara.run/public/boy",
            }
          } />
        }
      </SidebarFooter>
    </Sidebar>
  );
}
