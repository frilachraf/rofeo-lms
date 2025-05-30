
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
  { name: "Privacy", href: "#privacy" },
];

export const Header = () => {
  const { user, role } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            className="w-10 aspect-square object-cover"
            alt="Logo"
            src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/logo-removebg-preview-1-1.png"
          />
          <h1 className="font-semibold text-xl text-[#0e0e0e] hidden md:block">
            ROFEO Academy
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ scale: 1.05, color: "#000" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="transition-colors hover:text-black"
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || "https://avatar.iran.liara.run/public/boy"}
                      alt={user.email}
                    />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
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
                <DropdownMenuItem className="text-red-600" onClick={() => {}}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Link to="/login" className="text-[#545454] text-[15px]">
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Button className="bg-primary">Signup</Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
      <Separator />
    </header>
  );
};



// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export const Header = () => {
//   const { user, role } = useAuth();

//   return (
//     <header className="w-full relative">
//       <div className="flex items-center justify-between px-6 py-4">
//         <div className="flex items-center gap-2">
//           <img
//             className="w-12 aspect-square object-cover"
//             alt="Logo"
//             src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/logo-removebg-preview-1-1.png"
//           />
//           <h1 className="font-semibold text-xl text-[#0e0e0e] hidden md:block">
//             ROFEO Academy
//           </h1>
//         </div>

//         <div className="flex items-center gap-6">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage src={user.user_metadata?.avatar_url || 'https://avatar.iran.liara.run/public/boy'} alt={user.email} />
//                     <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{user.email}</p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {role}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link to="/student/profile">Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/student/courses">My Courses</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   className="text-red-600"
//                   onClick={() => {
//                     // Add your sign out logic here
//                   }}
//                 >
//                   Log out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <>
//               <Link to="/login" className="text-[#545454] text-[15px]">Login</Link>
//               <Button className="bg-primary">
//                 Signup
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//       <Separator className="w-full" />
//     </header>
//   );
// }; 