// import { Card, CardContent } from "@/components/ui/card";

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Belkadi",
//     position: "Parent d'élève",
//     text: '"Mon fils a adoré le cours de robotique ! Il est devenu passionné et passe son temps à créer de nouveaux projets. Merci ROFEO Academy !"',
//     image: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/profile-img-1.png",
//   },
//   {
//     id: 2,
//     name: "Mohamed El Fassi",
//     position: "Parent d'élève",
//     text: '"Les cours sont très bien conçus, avec un équilibre parfait entre théorie et pratique. Ma fille a beaucoup progressé en programmation."',
//     image: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/profile-img-2.png",
//   },
//   {
//     id: 3,
//     name: "Amine Tazi",
//     position: "Enseignant",
//     text: "\"En tant qu'enseignant, j'apprécie la qualité pédagogique des cours et les ressources disponibles. C'est un excellent outil pour initier les enfants à la technologie.\"",
//     image: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/profile-img-3.png",
//   },
// ];

// export const TestimonialsSection = () => {
//   return (
//     <section className="w-full max-w-[1440px] flex flex-col items-center mb-24">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-medium mb-6">
//           <span className="text-[#0e0e0e]">Ce que disent nos </span>
//           <span className="text-primary">étudiants</span>
//         </h2>
//         <p className="text-[#565656] text-base max-w-[692px]">
//           Découvrez les témoignages de parents et enfants qui ont suivi nos
//           cours
//         </p>
//       </div>

//       <div className="flex flex-wrap justify-center gap-8">
//         {testimonials.map((testimonial) => (
//           <Card
//             key={testimonial.id}
//             className="w-[322px] border-[#e1e1e1] rounded-lg shadow-[0px_4px_15px_#0000000d]"
//           >
//             <div className="bg-[#f2f2f2] p-5 rounded-t-lg flex items-center gap-5">
//               <img
//                 className="w-[50px] h-[50px] rounded-full"
//                 alt={`${testimonial.name} profile`}
//                 src={testimonial.image}
//               />
//               <div>
//                 <h3 className="font-medium text-lg text-[#4b445a]">
//                   {testimonial.name}
//                 </h3>
//                 <p className="font-medium text-xs text-[#62567a]">
//                   {testimonial.position}
//                 </p>
//               </div>
//             </div>
//             <CardContent className="p-5">
//               <div className="flex mb-4">
//                 {[...Array(4)].map((_, i) => (
//                   <img
//                     key={i}
//                     className="w-[18px] h-4"
//                     alt="Star"
//                     src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/star-6.svg"
//                   />
//                 ))}
//                 <img className="w-[17px] h-4" alt="Star" src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/star-9.png" />
//               </div>
//               <p className="text-gray-500 text-sm leading-[22px] mb-4">
//                 {testimonial.text}
//               </p>
//               <a href="#" className="text-[#1c70ff] text-sm underline">
//                 voir plus
//               </a>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }; 

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Belkadi",
    position: "Parent d'élève",
    text: "Mon fils a adoré le cours de robotique ! Il est devenu passionné et passe son temps à créer de nouveaux projets. Merci ROFEO Academy !",
    image: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/profile-img-1.png",
  },
  {
    id: 2,
    name: "Mohamed El Fassi",
    position: "Parent d'élève",
    text: "Les cours sont très bien conçus, avec un équilibre parfait entre théorie et pratique. Ma fille a beaucoup progressé en programmation.",
    image: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/profile-img-2.png",
  },
  {
    id: 3,
    name: "Amine Tazi",
    position: "Enseignant",
    text: "En tant qu'enseignant, j'apprécie la qualité pédagogique des cours et les ressources disponibles. C'est un excellent outil pour initier les enfants à la technologie.",
    image: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/profile-img-3.png",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="TestimonialsSection"  className="w-full max-w-full px-4 py-20 mx-auto flex flex-col items-center bg-[#f8f9fc] rounded-2xl shadow-sm">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-[#1c1c1c]">
          Ce que disent nos <span className="text-[#1c70ff]">étudiants</span>
        </h2>
        <p className="text-[#565656] text-base max-w-[692px] mx-auto">
          Découvrez les témoignages de parents et enseignants ayant suivi nos formations.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="w-[320px] border-[#e2e8f0] rounded-xl hover:shadow-md transition-shadow duration-300">
              <div className="bg-[#f1f5f9] p-5 rounded-t-xl flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  className="w-[50px] h-[50px] rounded-full border-2 border-white shadow"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#4b445a]">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm font-medium text-[#6b7280]">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex mb-3">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      className="w-4 h-4 mr-1"
                      alt="Star"
                      src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/star-6.svg"
                    />
                  ))}
                  <img
                    className="w-4 h-4"
                    alt="Star"
                    src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/star-9.png"
                  />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  “{testimonial.text}”
                </p>
                <a href="#" className="text-[#1c70ff] text-sm underline">
                  voir plus
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};