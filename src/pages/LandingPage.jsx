import { useRef, useState, useEffect } from "react";
import { SearchIcon, StarIcon, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Header } from "../components/landing/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { VideoSection } from "../components/landing/VideoSection";
import { TrustedCompaniesSection } from "../components/landing/TrustedCompaniesSection";
import { PopularCoursesSection } from "../components/landing/PopularCoursesSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { CallToActionSection } from "../components/landing/CallToActionSection";
import { AboutSection } from "../components/landing/AboutSection";
import { ContactSection } from "../components/landing/ContactSection";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [search, setSearch] = useState("");

  const handleScrollToCourses = () => {
    const section = document.getElementById("PopularCoursesSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white flex flex-col items-center w-full">
      <Header />
      <HeroSection search={search} setSearch={setSearch} />
      <VideoSection />
      <AboutSection /> 
      <TrustedCompaniesSection />
      <PopularCoursesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <ContactSection />
    </div>
  );
};

export default LandingPage;
