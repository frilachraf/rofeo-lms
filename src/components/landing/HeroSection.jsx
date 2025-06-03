import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const HeroSection = ({ search, setSearch }) => {
  const { t } = useTranslation();

  return (
    <section className="w-full flex flex-col items-center mt-16 mb-12 px-4">
      {/* Titre + Description */}
      <motion.div
        className="flex flex-col items-center max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
          <span className="text-[#0e0e0e]">{t("hero_title1")} </span>
          <span className="text-primary">{t("hero_title2")}</span>
        </h1>

        <img
          className="w-[214px] h-[30px] mb-6"
          alt="Sktech"
          src="https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/landingpage/sktech.svg"
        />

        <p className="text-[#565656] text-lg leading-relaxed mb-10">
          {t("hero_desc")}
        </p>
      </motion.div>

      {/* Barre de recherche */}
      <motion.div
        className="w-full max-w-xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center w-full h-[54px] bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="flex items-center flex-1 px-4 gap-2">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <Input
              className="border-0 shadow-none focus-visible:ring-0 text-gray-700 text-[15px] h-full placeholder:text-[#8a8c8f]"
              placeholder={t("search_placeholder")}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button className="h-[42px] rounded-md mr-2 bg-primary text-white">
            {t("search_button")}
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
