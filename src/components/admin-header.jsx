import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"

export function AdminHeader() {
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('/admin/home')) return "Tableau de Bord"
    if (path.includes('/admin/teachers')) return "Gestion des Enseignants"
    if (path.includes('/admin/courses')) return "Gestion des Cours"
    if (path.includes('/admin/students')) return "Gestion des Étudiants"
    return "Panneau d'Administration"
  }

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{getPageTitle()}</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground">
              
            </a>
          </Button> */}
        </div>
      </div>
    </header>
  );
}
