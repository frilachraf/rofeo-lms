// src/components/landing/AboutSection.jsx
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const AboutSection = () => {
  return (
    <section className="w-full 204 100% 97.1% text-white py-16 px-6">
      {/* Intro */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Qui sommes-nous ?</h2>
        <p className="text-lg mb-4">
          <strong>ROFEO Academy</strong> est une académie spécialisée dans la <strong>formation en robotique</strong> pour tous les niveaux : élèves, étudiants, enseignants ou passionnés.
        </p>
        <p className="text-lg mb-4">
          Nous organisons des <strong>cours pratiques et progressifs</strong>, adaptés à chacun, pour développer des compétences en <strong>programmation, électronique et mécatronique</strong>.
        </p>
      </div>

      {/* Mission + Objectifs */}
      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6 items-center">
        <AspectRatio ratio={4 / 3}>
          <img
            src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/PIC2.jpg"
            alt="Présentation"
            className="rounded-xl shadow-md object-cover w-full h-full"
          />
        </AspectRatio>

        <Card className="bg-white text-black shadow-xl rounded-xl">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Notre Mission</h3>
              <p className="text-gray-700">
                Offrir une formation accessible, encadrée par des experts, pour permettre à chacun de créer son propre projet en robotique, acquérir des compétences utiles à la vie personnelle ou professionnelle, ou réussir son projet de fin d’études.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">Nos Objectifs</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>Apprendre à programmer des robots (Thymio, Bibot, mBot...)</li>
                <li>Maîtriser Scratch, VPL et Arduino</li>
                <li>Comprendre les bases de l’électronique</li>
                <li>Créer un robot de A à Z</li>
                <li>Se préparer pour un PFE en robotique ou enseigner la robotique plus efficacement</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Galerie */}
      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="text-2xl font-bold mb-6 text-center">Quelques robots et activités</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {["PIC4.jpg", "PIC3.jpg", "PIC1.jpg", "PIC5.jpg"].map((img, idx) => (
            <Card key={idx} className="overflow-hidden rounded-xl shadow-md">
              <AspectRatio ratio={4 / 3}>
                <img
                  src={`https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/${img}`}
                  alt={`Robot ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};




/// src/components/landing/AboutSection.jsx
// export const AboutSection = () => {
//   return (
//     <section className="w-full bg-primary text-white py-16 px-6">
//       {/* Intro */}
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-4xl font-bold mb-6">Qui sommes-nous ?</h2>
//         <p className="text-lg mb-4">
//           <strong>ROFEO Academy</strong> est une académie spécialisée dans la <strong>formation en robotique</strong> pour tous les niveaux : élèves, étudiants, enseignants ou passionnés.
//         </p>
//         <p className="text-lg mb-4">
//           Nous organisons des <strong>cours pratiques et progressifs</strong>, adaptés à chacun, pour développer des compétences en <strong>programmation, électronique et mécatronique</strong>.
//         </p>
//       </div>

//       {/* Mission + Objectifs */}
//       <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-10 items-center bg-white text-black p-6 rounded-xl shadow-lg">
//         <img
//           src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/PIC2.jpg"
//           alt="Présentation"
//           className="rounded-xl shadow-md w-full object-cover"
//         />
//         <div>
//           <h3 className="text-2xl font-bold mb-3 text-blue-900">Notre Mission</h3>
//           <p className="mb-6 text-gray-700">
//             Offrir une formation accessible, encadrée par des experts, pour permettre à chacun de créer son propre projet en robotique, acquérir des compétences utiles à la vie personnelle ou professionnelle, ou réussir son projet de fin d’études.
//           </p>
//           <h3 className="text-2xl font-bold mb-3 text-red-600"> Nos Objectifs</h3>
//           <ul className="list-disc list-inside space-y-2 text-gray-800">
//             <li>Apprendre à programmer des robots (Thymio, Bibot, mBot...)</li>
//             <li>Maîtriser Scratch, VPL et Arduino</li>
//             <li>Comprendre les bases de l’électronique</li>
//             <li>Créer un robot de A à Z</li>
//             <li>Se préparer pour un PFE en robotique ou enseigner la robotique plus efficacement</li>
//           </ul>
//         </div>
//       </div>

//       {/* Galerie */}
//       <div className="max-w-6xl mx-auto mt-16">
//         <h3 className="text-2xl font-bold mb-6 text-center"> Quelques robots et activités</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
//           {[
//             "PIC4.jpg",
//             "PIC3.jpg",
//             "PIC1.jpg",
//             "PIC5.jpg",
//           ].map((img, idx) => (
//             <img
//               key={idx}
//               src={`https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/${img}`}
//               alt={`Robot ${idx + 1}`}
//               className="rounded-xl shadow-md object-cover h-48 w-full"
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };