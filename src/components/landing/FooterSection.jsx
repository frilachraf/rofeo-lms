
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const FooterSection = () => {
  return (
    <footer className="w-full bg-[#111820] text-white py-16">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Logo et description */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img
                src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/logo-removebg-preview-1-1.png"
                alt="ROFEO Logo"
                className="w-[33px] h-[42px] object-contain"
              />
              <span className="font-semibold text-xl">ROFEO Academy</span>
            </div>
            <p className="text-[#ffffffcc] text-sm leading-[30px]">
              ROFEO Academy est spécialisée dans les formations pour enfants en robotique, programmation et intelligence artificielle.
            </p>
          </div>

          {/* Liens de navigation */}
          <div>
            <h3 className="font-semibold text-base mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-[#ffffffcc] text-sm hover:underline">Accueil</a></li>
              <li><a href="/about" className="text-[#ffffffcc] text-sm hover:underline">À propos</a></li>
              <li><a href="/contact" className="text-[#ffffffcc] text-sm hover:underline">Contact</a></li>
              <li><a href="/privacy" className="text-[#ffffffcc] text-sm hover:underline">Politique de confidentialité</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-6">Newsletter</h3>
            <p className="text-[#ffffffcc] text-sm leading-[22px] mb-6">
              Recevez les dernières nouvelles, articles et ressources directement dans votre boîte mail.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 border-[#6b72804c] text-gray-200 rounded-r-none h-[38px]"
              />
              <Button className="bg-yellow-400 text-black font-semibold rounded-l-none h-[38px] hover:bg-yellow-300">
                S'abonner
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="text-center">
          <p className="text-[#ffffff99] text-[15px]">
            © 2025 ROFEO Academy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};


