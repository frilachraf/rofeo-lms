// // const trustedCompanies = [
// //   { id: 1, name: "Microsoft", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/microsoft-logo.svg" },
// //   { id: 2, name: "Walmart", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/walmart-logo.svg" },
// //   { id: 3, name: "Accenture", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/accenture-logo.svg" },
// //   { id: 4, name: "Adobe", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/adobe-logo.svg" },
// //   { id: 5, name: "PayPal", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/paypal-logo.svg" },
// // ];

// // export const TrustedCompaniesSection = () => {
// //   return (
// //     <section className="w-full max-w-[1440px] flex flex-col items-center mb-24">
// //       <p className="text-[#565656] text-base font-medium text-center mb-10">
// //         Trusted by learners from
// //       </p>
// //       <div className="flex justify-center items-center gap-10">
// //         {trustedCompanies.map((company) => (
// //           <img
// //             key={company.id}
// //             className="h-[25px] object-contain"
// //             alt={`${company.name} logo`}
// //             src={company.logo}
// //           />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }; 

// import { motion } from "framer-motion";

// const trustedCompanies = [
//   {
//     id: 1,
//     name: "Microsoft",
//     logo:
//       "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/microsoft-logo.svg",
//   },
//   {
//     id: 2,
//     name: "Walmart",
//     logo:
//       "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/walmart-logo.svg",
//   },
//   {
//     id: 3,
//     name: "Accenture",
//     logo:
//       "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/accenture-logo.svg",
//   },
//   {
//     id: 4,
//     name: "Adobe",
//     logo:
//       "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/adobe-logo.svg",
//   },
//   {
//     id: 5,
//     name: "PayPal",
//     logo:
//       "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/paypal-logo.svg",
//   },
// ];

// export const TrustedCompaniesSection = () => {
//   return (
//     <section className="w-full max-w-[1440px] mx-auto px-4 py-20 flex flex-col items-center bg-muted/50 rounded-2xl shadow-sm">
//       <motion.p
//         className="text-muted-foreground text-center text-base sm:text-lg font-medium mb-10"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5 }}
//       >
//         Des entreprises de renom font confiance à nos talents
//       </motion.p>

//       <motion.div
//         className="flex flex-wrap justify-center items-center gap-8 sm:gap-12"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={{
//           visible: {
//             transition: {
//               staggerChildren: 0.1,
//             },
//           },
//         }}
//       >
//         {trustedCompanies.map((company) => (
//           <motion.img
//             key={company.id}
//             src={company.logo}
//             alt={`${company.name} logo`}
//             className="h-6 sm:h-8 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
//             variants={{
//               hidden: { opacity: 0, y: 20 },
//               visible: { opacity: 1, y: 0 },
//             }}
//           />
//         ))}
//       </motion.div>
//     </section>
//   );
// };
import { motion } from "framer-motion";

const trustedCompanies = [
  { id: 1, name: "Microsoft", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/microsoft-logo.svg" },
  { id: 2, name: "Walmart", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/walmart-logo.svg" },
  { id: 3, name: "Accenture", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/accenture-logo.svg" },
  { id: 4, name: "Adobe", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/adobe-logo.svg" },
  { id: 5, name: "PayPal", logo: "https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/paypal-logo.svg" },
];

export const TrustedCompaniesSection = () => {
  return (
    <section className="w-full max-w-full px-4 py-20 mx-auto flex flex-col items-center bg-[#f0f4ff] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <motion.h2
        className="text-[#1c70ff] text-lg sm:text-xl font-semibold text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Partenaire des leaders de l'innovation
      </motion.h2>
      
      <motion.p
        className="text-[#565656] text-base sm:text-lg text-center mb-10 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Ces entreprises de renommée internationale soutiennent l’esprit d’innovation et la formation digitale.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center items-center gap-8 sm:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        {trustedCompanies.map((company) => (
          <motion.img
            key={company.id}
            src={company.logo}
            alt={`${company.name} logo`}
            className="h-6 sm:h-8  hover:opacity-100 hover:grayscale-0 transition-all duration-300 ease-in-out"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};
