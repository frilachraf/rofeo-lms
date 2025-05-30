import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center mt-16 mb-12">
      <div className="flex flex-col items-center max-w-[659px] text-center">
        <h1 className="text-3xl font-medium mb-6">
          <span className="text-[#0e0e0e]">Apprenez la robotique </span>
          <span className="text-primary"> de façon ludique</span>
        </h1>
        
        <img
          className="w-[214px] h-[30px] mb-6"
          alt="Sktech"
          src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/sktech.svg"
        />
        <p className="text-[#565656] text-base leading-6 mb-12">
          ROFEO Academy aide les enfants à développer leurs compétences en
          robotique,
          <br /> programmation et intelligence artificielle à travers des
          cours interactifs et amusants.
        </p>
      </div>

      <div className="w-full max-w-[601px] relative">
        <div className="flex items-center w-full h-[54px] bg-white rounded-lg border border-solid border-[#6b728033]">
          <div className="flex items-center flex-1 px-5 gap-2">
            <SearchIcon className="w-[18px] h-[18px] text-gray-400" />
            <Input
              className="border-0 shadow-none focus-visible:ring-0 text-[#8a8c8f] text-[15px] h-full"
              placeholder="Rechercher un cours ..."
            />
          </div>
          <Button className="h-[42px] mr-1 bg-primary">
            Rechercher
          </Button>
        </div>
      </div>
    </section>
  );
}; 