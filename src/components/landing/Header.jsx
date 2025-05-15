import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const {user,role} = useAuth()

  return (
    <header className="w-full relative">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <img
            className="w-[52px] h-[66px] object-cover"
            alt="Logo"
            src="../../src/components/imges/logo-removebg-preview-1-1.png"
          />
          <h1 className="font-semibold text-2xl text-[#0e0e0e]">
            ROFEO Academy
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="text-[#545454] text-[15px]">Login</Link>
          <Button className="bg-primary">
            S'inscrire
          </Button>
        </div>
      </div>
      <Separator className="w-full" />
    </header>
  );
}; 