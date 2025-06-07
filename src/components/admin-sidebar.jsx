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
import { HouseLine, Heart, Horse, Users, UsersThree, Notebook } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext"
const data = {
  user: {
    name: "shadcn",
    email:"m@example.com",
    avatar:  "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/admin/home",
      icon: HouseLine,
    },
    // {
    //   title: "Analytics",
    //   url: "",
    //   icon: IconChartBar,
    // },
    {
      title: "Teachers",
      url: "/admin/teachers",
      icon: Users,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: Notebook,
    },
    {
      title: "Students",
      url: "/admin/students",
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
    //   name: "Data Library",
    //   url: "#",
    //   icon: IconDatabase,
    // },
    // {
    //   name: "Reports",
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

export function AppSidebar({
  ...props
}) {

  const {user}=useAuth()
  return (
    <Sidebar collapsible="offcanvas" {...props}>
        {/* 
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5 text-primary" />
                <span className="text-base font-semibold text"></span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> 
      </SidebarHeader>
        */}
      
      <SidebarContent>
        <NavMain items={data.navMain} quickLink={false} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user &&
          <NavUser user={{
            name: user?.user_metadata?.full_name ||"shadcn",
            email:  user && user?.email,
            avatar:  user?.user_metadata?.picture || "https://avatar.iran.liara.run/public/boy",
            }
          } />
        }
      </SidebarFooter>
    </Sidebar>
  );
}
