import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

// Animations
const fadeSlide = {
  hidden: { opacity: 0, y: 50, scale: 0.95, rotateX: 10 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

export const AboutSection = () => {
  return (
    <section className="w-full relative overflow-hidden text-white py-20 px-6 bg-gradient-to-br from-[#4964a3] via-[#134697] to-[#0f172a]">
      {/* Background visual elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 bg-blue-800 opacity-20 rounded-full blur-3xl top-0 left-1/4 animate-pulse" />
        <div className="absolute w-72 h-72 bg-rose-800 opacity-10 rounded-full blur-2xl bottom-0 right-1/3 animate-ping" />
      </div>

      {/* Intro */}
      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeSlide}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 glitch-text relative inline-block">
          <span className="relative z-20">Qui sommes-nous ?</span>
          <span className="absolute z-10 inset-0 text-blue-400 animate-glitch -translate-x-1 translate-y-1 opacity-40">Qui sommes-nous ?</span>
        </h2>
        <p className="text-lg text-gray-200 mb-4">
          <strong>ROFEO Academy</strong> forme les créateurs de demain en robotique — pour <em>tous les niveaux</em>, avec une pédagogie pratique, fun et progressive.
        </p>
        <p className="text-lg text-gray-300">
          Développe tes super-pouvoirs en <strong>programmation, électronique et mécatronique</strong>, à ton rythme et selon tes projets !
        </p>
      </motion.div>

      {/* Mission + Objectifs */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-8 items-center z-10 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeSlide}
          custom={1}
        >
          <AspectRatio ratio={4 / 3}>
            <img
              src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/PIC2.jpg"
              alt="Présentation"
              className="rounded-2xl shadow-xl object-cover w-full h-full "
              // border-4 border-blue-400/30
            />
          </AspectRatio>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeSlide}
          custom={2}
        >
          <Card className="bg-white/90 backdrop-blur-md text-black shadow-2xl rounded-2xl">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-indigo-800 mb-2"> Notre Mission</h3>
                <p className="text-gray-700">
                  Te permettre de créer ton propre robot, réussir ton PFE ou devenir formateur grâce à des ateliers 100% concrets et accompagnés.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="text-2xl font-bold text-rose-700 mb-2"> Nos Objectifs</h3>
                <ul className="list-disc list-inside text--color-sky-50 space-y-1">
                  <li>Programmer des robots (Thymio, Bibot, mBot...)</li>
                  <li>Maîtriser Scratch, VPL et Arduino</li>
                  <li>Comprendre l’électronique en t’amusant</li>
                  <li>Construire ton robot de A à Z</li>
                  <li>Préparer ton avenir en robotique</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>


{/* Galerie */}
<motion.div
  className="max-w-7xl mx-auto mt-24 relative z-10"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeSlide}
>
  <h3 className="text-3xl font-bold mb-8 text-center text-white"> Quelques robots et activités</h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {["PIC4.jpg", "PIC3.jpg", "PIC1.jpg", "PIC5.jpg"].map((img, idx) => (
      <motion.div
        key={idx}
        custom={idx}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeSlide}
      >
        <div className="w-full h-48 sm:h-52 md:h-60 lg:h-64 rounded-lg overflow-hidden shadow-md hover:shadow-blue-300/30 transition-transform hover:scale-105">
          <img
            src={`https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/${img}`}
            alt={`Robot ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

    
    </section>
  );
};


