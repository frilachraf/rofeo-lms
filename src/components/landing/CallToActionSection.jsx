import { Button } from "@/components/ui/button";

export const CallToActionSection = () => {
  return (
    <section className="w-full max-w-[1440px] flex flex-col items-center mb-24">
      <h2 className="text-[38px] font-semibold text-gray-800 text-center leading-[44px] mb-6 max-w-[841px]">
        Apprenez tout, à tout moment, où que vous soyez
      </h2>
      <p className="text-[#1f2937e6] text-base text-center leading-[22px] mb-10 max-w-[1025px]">
        Offrez à votre enfant la possibilité de développer ses compétences en
        robotique et programmation grâce à nos cours adaptés à tous les
        niveaux.
        <br /> Prêt à commencer l'aventure avec ROFEO Academy ?<br />
        Inscrivez-le dès aujourd'hui et donnez-lui une longueur d'avance dans
        le monde de demain.
      </p>
      <div className="flex items-center gap-4">
        <Button className="bg-[#0260ffe6] rounded-[5px] px-7">
          Commencer
        </Button>
        <div className="flex items-center gap-1 text-gray-800 font-medium text-sm">
          En savoir plus
          <img
            className="w-[15px] h-2.5"
            alt="Arrow icon"
            src="../../src/components/imges/arrow-icon.svg"
          />
        </div>
      </div>
    </section>
  );
}; 