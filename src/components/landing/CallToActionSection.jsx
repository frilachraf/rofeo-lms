import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; 
import { motion } from "framer-motion";

export const CallToActionSection = () => {
  return (
    <section className="w-full max-w-full mx-auto flex flex-col items-center px-4 py-20 mb-24 bg-[#f9fafb] rounded-2xl shadow-sm">
      <motion.h2
        className="text-[32px] md:text-[38px] font-semibold text-gray-800 text-center leading-tight mb-6 max-w-[841px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Apprenez tout, à tout moment, où que vous soyez
      </motion.h2>

      <motion.p
        className="text-[#1f2937e6] text-base text-center leading-[24px] mb-10 max-w-[1025px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Offrez à votre enfant la possibilité de développer ses compétences en
        robotique et programmation grâce à nos cours adaptés à tous les niveaux.
        <br />
        Prêt à commencer l'aventure avec <strong>ROFEO Academy</strong> ?<br />
        Inscrivez-le dès aujourd'hui et donnez-lui une longueur d'avance dans
        le monde de demain.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Button className="bg-primary hover:bg-[#155edc] text-white rounded-md px-8 py-2 text-base transition-colors duration-300">
          Commencer
        </Button>

        <button className="flex items-center gap-2 text-[#1c70ff] hover:underline font-medium text-sm transition-all duration-300">
          En savoir plus
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
};


// import { Button } from "@/components/ui/button";

// export const CallToActionSection = () => {
//   return (
//     <section className="w-full max-w-[1440px] flex flex-col items-center mb-24">
//       <h2 className="text-[38px] font-semibold text-gray-800 text-center leading-[44px] mb-6 max-w-[841px]">
//         Apprenez tout, à tout moment, où que vous soyez
//       </h2>
//       <p className="text-[#1f2937e6] text-base text-center leading-[22px] mb-10 max-w-[1025px]">
//         Offrez à votre enfant la possibilité de développer ses compétences en
//         robotique et programmation grâce à nos cours adaptés à tous les
//         niveaux.
//         <br /> Prêt à commencer l'aventure avec ROFEO Academy ?<br />
//         Inscrivez-le dès aujourd'hui et donnez-lui une longueur d'avance dans
//         le monde de demain.
//       </p>
//       <div className="flex items-center gap-4">
//         <Button className="bg-[#0260ffe6] rounded-[5px] px-7">
//           Commencer
//         </Button>
//         <div className="flex items-center gap-1 text-gray-800 font-medium text-sm">
//           En savoir plus
//           <img
//             className="w-[15px] h-2.5"
//             alt="Arrow icon"
//             src="../../src/components/imges/arrow-icon.svg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }; 