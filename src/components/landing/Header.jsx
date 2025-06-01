import { useEffect, useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { name: "Qui sommes-nous ?", href: "#AboutSection" },
   { name: "Ce que disent nos étudiants", href: "#TestimonialsSection" },
  { name: "Contactez-nous", href: "#ContactSection" },
 
];

export const Header = () => {
  const { user, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sectionIds = navLinks.map(link => link.href.replace('#', ''));
      let current = "";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) { // 80 = hauteur du header
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium  text-gray-600">
          {navLinks.map((link, index) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <motion.a
                key={index}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                whileHover={{ scale: 1.05, color: "black" }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`transition-colors hover:text-black ${isActive ? " font-bold text-black" : ""}`}
              >
                {link.name}
              </motion.a>
            );
          })}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* auth */}
        <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-6 py-4 shadow-inner flex flex-col gap-4"
          >
            {navLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-700 hover:text-black">
                {link.name}
              </a>
            ))}
            {!user && (
              <>
                <Link to="/login" className="text-[#545454]">
                  Login
                </Link>
                <Button className="w-full mt-2">Signup</Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


// import { useEffect,useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";






// const navLinks = [
//   { name: "About", href: "#AboutSection" },
//   { name: "Contact", href: "#ContactSection" },
//   { name: "Privacy", href: "#privacy" },
// ];




// export const Header = () => {
//   const { user, role } = useAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

// useEffect(() => {
//   const handleScroll = () => {
//     if (window.scrollY > 10) {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);

//   return (
//  <header
//       className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-md" : "bg-transparent"
//       }`}
//     >      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <img
//             className="w-10 aspect-square object-cover"
//             alt="Logo"
//             src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/logo-removebg-preview-1-1.png"
//           />
//           <h1 className="font-semibold text-xl text-[#0e0e0e] hidden md:block">
//             ROFEO Academy
//           </h1>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
//           {navLinks.map((link, index) => (
//             <motion.a
//               key={index}
//               href={link.href}
//               whileHover={{ scale: 1.05, color: "#000" }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="transition-colors hover:text-black"
//             >
//               {link.name}
//             </motion.a>
//           ))}
//         </nav>

//          {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </Button>
//         </div> 

//       {/* auth */}
//         <div className="hidden md:flex items-center gap-4">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="h-8 w-8 rounded-full">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage
//                       src={user.user_metadata?.avatar_url || "https://avatar.iran.liara.run/public/boy"}
//                       alt={user.email}
//                     />
//                     <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel>
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium">{user.email}</p>
//                     <p className="text-xs text-muted-foreground">{role}</p>
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
//                 <DropdownMenuItem className="text-red-600" onClick={() => {}}>
//                   Log out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <>
//               <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//                 <Link to="/login" className="text-[#545454] text-[15px]">
//                   Login
//                 </Link>
//               </motion.div>
//               <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
//                 <Button className="bg-primary">Signup</Button>
//               </motion.div>
//             </>
//           )}
//         </div> 
//       </div> 

//       <Separator />

//       {/* Mobile Menu Content */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-white px-6 py-4 shadow-inner flex flex-col gap-4"
//           >
//             {navLinks.map((link, index) => (
//               <a key={index} href={link.href} className="text-gray-700 hover:text-black">
//                 {link.name}
//               </a>
//             ))}
//             {!user && (
//               <>
//                 <Link to="/login" className="text-[#545454]">
//                   Login
//                 </Link>
//                 <Button className="w-full mt-2">Signup</Button>
//               </>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };



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