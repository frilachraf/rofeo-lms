import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { List, MagnifyingGlass } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookOpenIcon, HomeIcon, LogOutIcon, XIcon } from "lucide-react";
import { SheetClose } from "./ui/sheet";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "../services/supabase";

export function StudentHeader({}) {
  const [open, setOpen] = useState(false);
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    await signOut();
    navigate('/login');
  };

  const studentNavLinks = [
    {
      name: 'Home',
      path: '/student/dashboard', // Link to student dashboard as home
      icon: HomeIcon
    },
    {
      name: 'Explore Courses',
      path: '/courses',
      icon: MagnifyingGlass
    },
    {
      name: 'My Courses',
      path: '/student/courses',
      icon: BookOpenIcon
    },
    {
      name: 'Logout',
      action: logout, // Direct action for logout
      icon: LogOutIcon
    }
  ];

  return (
    <header
      className="bg-white flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-4">
        <Link to="/">
        <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
        </Link>
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        
        <div className="ml-auto flex items-center gap-2">
          {user && role === 'student' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.user_metadata?.avatar_url || 'https://avatar.iran.liara.run/public/boy'} alt={user.email} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/student/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/student/courses">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={logout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="text-[#545454] text-[15px]">Login</Link>
              <Button className="bg-primary">
                Signup
              </Button>
            </>
          )}
          <Button className="bg-transparent border-none" variant="ghost" onClick={() => setOpen(true)}>
          <List weight="bold" className="size-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet onOpenChange={setOpen} open={open}>
            
          <SheetContent side="left" className="h-screen w-screen">
            <SheetHeader className="border">
            <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
            <SheetClose asChild className="absolute top-4 right-4 z-50 ">
              <Button variant="ghost" size="icon" className="rounded-full">
                <XIcon size={20} />
              </Button>
            </SheetClose>
            </SheetHeader>
            <div className="flex flex-col justify-between h-full p-4">
              <div className="flex flex-col gap-4 p-4">
                {studentNavLinks.map((link) => (
                  link.action ? ( // If it has an action (like logout)
                    <Button
                      key={link.name}
                      variant="ghost"
                      className="flex items-center gap-2 w-full justify-start"
                      onClick={() => {
                        link.action();
                        setOpen(false);
                      }}
                    >
                      <link.icon size={20}/>
                      {link.name}
                    </Button>
                  ) : ( // Otherwise, it's a regular navigation link
                    <NavLink
                      to={link.path}
                      key={link.name}
                      className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary" : "flex items-center gap-2"}
                      onClick={() => setOpen(false)}
                    >
                      <link.icon size={20}/>
                      {link.name}
                    </NavLink>
                  )
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
    </header>
  );
}
