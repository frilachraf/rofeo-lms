

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const FooterSection = () => {
  return (
    <footer className="w-full bg-[#111820] text-white py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Logo et description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/logo-removebg-preview-1-1.png"
                alt="Logo ROFEO Academy"
                className="w-10 h-12 object-contain"
              />
              <span className="font-bold text-xl sm:text-2xl">ROFEO Academy</span>
            </div>
            <p className="text-[#ffffffcc] text-sm leading-6">
              ROFEO Academy est spécialisée dans les formations pour enfants en robotique, programmation et intelligence artificielle.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-base mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-[#ffffffcc] text-sm hover:underline">Accueil</a></li>
              <li><a href="/about" className="text-[#ffffffcc] text-sm hover:underline">À propos</a></li>
              <li><a href="/contact" className="text-[#ffffffcc] text-sm hover:underline">Contact</a></li>
              <li><a href="/privacy" className="text-[#ffffffcc] text-sm hover:underline">Politique de confidentialité</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-6">Contact</h3>
            <div className="space-y-4 text-sm text-[#ffffffcc]">
              <div>
                <h4 className="font-medium text-white mb-1">Téléphones</h4>
                <p>06 71 13 49 89</p>
                <p>06 76 72 47 39</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Email</h4>
                <p>rofeo.academy@gmail.com</p>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="newsletter" className="block mb-2 text-sm font-medium text-white">
                S’inscrire à notre newsletter
              </label>
              <div className="flex">
                <Input
                  id="newsletter"
                  type="email"
                  placeholder="Votre email"
                  className="bg-gray-800 border border-[#6b72804c] text-gray-200 rounded-r-none h-[38px]"
                  aria-label="Adresse email"
                />
                <Button className="bg-blue-400 text-black font-semibold rounded-l-none h-[38px] hover:bg-yellow-300">
                  S'abonner
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="text-center">
          <p className="text-[#ffffff99] text-sm">
            © 2025 ROFEO Academy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};








// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";

// export const FooterSection = () => {
//   return (
//     <footer className="w-full bg-[#111820] text-white py-16">
//       <div className="max-w-[1440px] mx-auto px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
//           {/* Logo et description */}
//           <div>
//             <div className="flex items-center gap-2 mb-6">
//               <img
//                 src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/logo-removebg-preview-1-1.png"
//                 alt="ROFEO Logo"
//                 className="w-[33px] h-[42px] object-contain"
//               />
//               <span className="font-semibold text-xl">ROFEO Academy</span>
//             </div>
//             <p className="text-[#ffffffcc] text-sm leading-[30px]">
//               ROFEO Academy est spécialisée dans les formations pour enfants en robotique, programmation et intelligence artificielle.
//             </p>
//           </div>

//           {/* Liens de navigation */}
//           <div>
//             <h3 className="font-semibold text-base mb-6">Navigation</h3>
//             <ul className="space-y-3">
//               <li><a href="/" className="text-[#ffffffcc] text-sm hover:underline">Accueil</a></li>
//               <li><a href="/about" className="text-[#ffffffcc] text-sm hover:underline">À propos</a></li>
//               <li><a href="/contact" className="text-[#ffffffcc] text-sm hover:underline">Contact</a></li>
//               <li><a href="/privacy" className="text-[#ffffffcc] text-sm hover:underline">Politique de confidentialité</a></li>
//             </ul>
//           </div>
// {/*            
//               <div>
//                 <h3 className="text-xl font-semibold">📱 Téléphones :</h3>
//                 <p>06 71 13 49 89</p>
//                 <p>06 76 72 47 39</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold">📧 Email :</h3>
//                 <p>rofeo.academy@gmail.com</p>
//               </div> */}
          
 
//           {/* Newsletter */}
//           <div>
//             <h3 className="font-semibold text-base mb-6">Contact</h3>
            
//               <div>
//                 <h3 className="text-xl font-semibold">Téléphones :</h3>
//                 <p>06 71 13 49 89</p>
//                 <p>06 76 72 47 39</p>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold"> Email :</h3>
//                 <p>rofeo.academy@gmail.com</p>
//               </div>
//               <br/>
//             <div className="flex">
//               <Input
//                 type="email"
//                 placeholder="Votre email"
//                 className="bg-gray-800 border-[#6b72804c] text-gray-200 rounded-r-none h-[38px]"
//               />
//               <Button className="bg-blue-400 text-black font-semibold rounded-l-none h-[38px] hover:bg-yellow-300">
//                 S'abonner
//               </Button>
//             </div>
//           </div>
//         </div>

//         <Separator className="bg-white/20 my-6" />

//         <div className="text-center">
//           <p className="text-[#ffffff99] text-[15px]">
//             © 2025 ROFEO Academy. Tous droits réservés.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };


