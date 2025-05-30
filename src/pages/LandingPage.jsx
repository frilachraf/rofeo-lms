// import { useRef, useState, useEffect } from "react";
// import { SearchIcon, StarIcon, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Card, CardContent } from "../components/ui/card";
// import { Input } from "../components/ui/input";
// import { Separator } from "../components/ui/separator";
// import { Header } from "../components/landing/Header";
// import * as React from "react"

import { HeroSection } from "../components/landing/HeroSection";
import { VideoSection } from "../components/landing/VideoSection";
import { TrustedCompaniesSection } from "../components/landing/TrustedCompaniesSection";
import { PopularCoursesSection } from "../components/landing/PopularCoursesSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { CallToActionSection } from "../components/landing/CallToActionSection";
import { FooterSection } from "../components/landing/FooterSection";
import { AboutSection } from "../components/landing/AboutSection";
import { ContactSection } from "../components/landing/ContactSection";

// Course data for mapping
const popularCourses = [
  {
    id: 1,
    title: "Introduction à la Robotique",
    instructor: "Ibrahim Kamel",
    rating: 4.5,
    reviews: 122,
    price: "109.99 DH",
    image: "../../src/components/imges/intro to robots.jpg",
  },
  {
    id: 2,
    title: "les bases de la robotique grâce au BeeBot",
    instructor: "Richard James",
    rating: 4.5,
    reviews: 122,
    price: "610.99 DH",
    image: "../../src/components/imges/cours.jpg",
  },
  {
    id: 3,
    title: "Le monde des robots",
    instructor: "Richard James",
    rating: 4.5,
    reviews: 122,
    price: "190.99 DH",
    image: "../../src/components/imges/le monde des robots.jpg",
  },
  {
    id: 4,
    title: "Programmation du Robot Thymio (VPL & Thymio)",
    instructor: "Richard James",
    rating: 4.5,
    reviews: 122,
    price: "175.95 DH",
    image: "../../src/components/imges/elec.jpg",
  },
];

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Belkadi",
    position: "Parent d'élève",
    text: '"Mon fils a adoré le cours de robotique ! Il est devenu passionné et passe son temps à créer de nouveaux projets. Merci ROFEO Academy !"',
    image: "../../src/components/imges/profile-img-1.png",
  },
  {
    id: 2,
    name: "Mohamed El Fassi",
    position: "Parent d'élève",
    text: '"Les cours sont très bien conçus, avec un équilibre parfait entre théorie et pratique. Ma fille a beaucoup progressé en programmation."',
    image: "../../src/components/imges/profile-img-2.png",
  },
  {
    id: 3,
    name: "Amine Tazi",
    position: "Enseignant",
    text: "\"En tant qu'enseignant, j'apprécie la qualité pédagogique des cours et les ressources disponibles. C'est un excellent outil pour initier les enfants à la technologie.\"",
    image: "../../src/components/imges/profile-img-3.png",
  },
];

// Trusted companies
const trustedCompanies = [
  { id: 1, name: "Microsoft", logo: "../../src/components/imges/microsoft-logo.svg" },
  { id: 2, name: "Walmart", logo: "../../src/components/imges/walmart-logo.svg" },
  { id: 3, name: "Accenture", logo: "../../src/components/imges/accenture-logo.svg" },
  { id: 4, name: "Adobe", logo: "../../src/components/imges/adobe-logo.svg" },
  { id: 5, name: "PayPal", logo: "../../src/components/imges/paypal-logo.svg" },
];

const LandingPage = () => {
  return (
    <div className="bg-white flex flex-col items-center w-full">
      {/* <Header /> */}
      <HeroSection />
      <VideoSection />
      <AboutSection /> 
      <TrustedCompaniesSection />
      <PopularCoursesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <ContactSection /> 
      {/* <FooterSection /> */}
    </div>
  );
};

export default LandingPage;
