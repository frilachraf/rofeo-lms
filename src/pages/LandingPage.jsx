import { useRef, useState, useEffect } from "react";
import { SearchIcon, StarIcon, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";

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
  // Video player refs and state
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Initialize video duration and set up event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDuration = () => {
      setDuration(video.duration || 0);
    };

    const handleLoadedMetadata = () => {
      updateDuration();
      video.volume = volume;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', () => setIsVideoPlaying(false));

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', () => setIsVideoPlaying(false));
    };
  }, [volume]);

  // Auto-hide controls
  useEffect(() => {
    if (!showControls) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(currentTime);
      setVideoProgress((currentTime / duration) * 100);
    }
  };

  const handleProgressChange = (e) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = ('touches' in e) ? 
      (e.touches[0].clientX - rect.left) / rect.width :
      (e.clientX - rect.left) / rect.width;
    
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setVideoProgress(pos * 100);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  return (
    <div className="bg-white flex flex-col items-center w-full">
      {/* Header/Navigation */}
      <header className="w-full relative">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <img
              className="w-[52px] h-[66px] object-cover"
              alt="Logo"
              src="../../src/components/imges/logo-removebg-preview-1-1.png"
            />
            <h1 className="font-semibold text-2xl text-[#0e0e0e]">
              ROFEO Academy
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#545454] text-[15px]">Add Courses</span>
            <span className="text-[#545454] text-[15px]">Login</span>
            <span className="text-[#a9a9a9] text-[15px]">|</span>
            <Button className="bg-blue-600 rounded-[50px] px-7">
              S'inscrire
            </Button>
          </div>
        </div>
        <Separator className="w-full" />
      </header>

      {/* Hero Section */}
      <section className="w-full  flex flex-col items-center mt-16 mb-12">
        <div className="flex flex-col items-center max-w-[659px] text-center">
           <h1 className="text-3xl font-medium mb-6">
            <span className="text-[#0e0e0e]">Apprenez la robotique </span>
            <span className="text-[#0260ff]"> de façon ludique</span>
          </h1>
         
          <img
            className="w-[214px] h-[30px] mb-6"
            alt="Sktech"
            src="../../src/components/imges//sktech.svg"
          />
          <p className="text-[#565656] text-base leading-6 mb-12">
            ROFEO Academy aide les enfants à développer leurs compétences en
            robotique,
            <br /> programmation et intelligence artificielle à travers des
            cours interactifs et amusants.
          </p>
        </div>

        <div className="w-full max-w-[601px] relative">
          <div className="flex items-center w-full h-[54px] bg-white rounded-[5px] border border-solid border-[#6b728033]">
            <div className="flex items-center flex-1 px-5 gap-2">
              <SearchIcon className="w-[18px] h-[18px] text-gray-400" />
              <Input
                className="border-0 shadow-none focus-visible:ring-0 text-[#8a8c8f] text-[15px] h-full"
                placeholder="Rechercher un cours ..."
              />
            </div>
            <Button className="h-[42px] mr-1 bg-blue-600 rounded-[5px]">
              Rechercher
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Video Section */}
      <section className="w-full  mx-auto py-16 px-4 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-[#0e0e0e] mb-8">
            L'aventure ROFEO Academy commence ici !
          </h1>
          <p className="text-[#565656] text-base leading-6 mb-12">
            Inscrivez votre enfant dès maintenant et boostez ses compétences en robotique, 
            programmation et IA avec des ateliers innovants et passionnants !
          </p>
        </div>

        <div 
          ref={videoContainerRef}
          className="relative w-full max-w-4xl group"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video container */}
          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              poster="../../src/components/imges/logo-removebg-preview-1-1.png"
            >
              <source src="../../src/components/vid/VID1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play button overlay */}
            {!isVideoPlaying && (
              <button 
                className="absolute inset-0 flex items-center justify-center"
                onClick={togglePlay}
              >
                <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:bg-opacity-90 transition-all">
                  <Play className="w-8 h-8 text-[#2a2a2a]" />
                </div>
              </button>
            )}

            {/* Video controls */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 rounded-b-lg transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Progress bar */}
              <div 
                className="w-full h-2 bg-gray-600 bg-opacity-50 rounded-full mb-3 cursor-pointer"
                onClick={handleProgressChange}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseMove={(e) => isDragging && handleProgressChange(e)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleProgressChange}
              >
                <div 
                  className="h-full bg-red-600 rounded-full relative"
                  style={{ width: `${videoProgress}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full"></div>
                </div>
              </div>

              {/* Bottom controls bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause button */}
                  <button onClick={togglePlay} className="text-white">
                    {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>

                  {/* Volume controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white">
                      {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>

                  {/* Time display */}
                  <div className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Fullscreen button */}
                <button onClick={toggleFullscreen} className="text-white">
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="w-full max-w-[1440px] flex flex-col items-center mb-24">
        <p className="text-[#565656] text-base font-medium text-center mb-10">
          Trusted by learners from
        </p>
        <div className="flex justify-center items-center gap-10">
          {trustedCompanies.map((company) => (
            <img
              key={company.id}
              className="h-[25px] object-contain"
              alt={`${company.name} logo`}
              src={company.logo}
            />
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section className="w-full  flex flex-col items-center mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium text-[#0e0e0e] mb-8">
            Nos cours populaires
          </h2>
          <p className="text-[#565656] text-base max-w-[630px]">
            Découvrez nos formations les plus appréciées par nos étudiants
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {popularCourses.map((course) => (
            <Card
              key={course.id}
              className="w-[265px] border-[#e1e1e1] rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-[148px] object-cover"
                alt={course.title}
                src={course.image}
              />
              <CardContent className="p-5">
                <h3 className="font-semibold text-base text-[#0e0e0e] mb-2 leading-5">
                  {course.title}
                </h3>
                <p className="text-[#565656] text-sm mb-4">
                  {course.instructor}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  <span className="font-medium text-neutral-700 text-sm">
                    {course.rating}
                  </span>
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-3 h-3 fill-current text-yellow-500"
                      />
                    ))}
                    <StarIcon className="w-3 h-3 text-gray-300" />
                  </div>
                  <span className="text-[#888888] text-sm ml-2">
                    ({course.reviews})
                  </span>
                </div>
                <p className="font-semibold text-neutral-700 text-base">
                  {course.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          className="border-[#6b728080] text-[#8a8c8f] rounded-[5px] px-4 py-2"
        >
          Voir tous les cours
        </Button>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-[1440px] flex flex-col items-center mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium mb-6">
            <span className="text-[#0e0e0e]">Ce que disent nos </span>
            <span className="text-[#0260ff]">étudiants</span>
          </h2>
          <p className="text-[#565656] text-base max-w-[692px]">
            Découvrez les témoignages de parents et enfants qui ont suivi nos
            cours
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="w-[322px] border-[#e1e1e1] rounded-lg shadow-[0px_4px_15px_#0000000d]"
            >
              <div className="bg-[#f2f2f2] p-5 rounded-t-lg flex items-center gap-5">
                <img
                  className="w-[50px] h-[50px] rounded-full"
                  alt={`${testimonial.name} profile`}
                  src={testimonial.image}
                />
                <div>
                  <h3 className="font-medium text-lg text-[#4b445a]">
                    {testimonial.name}
                  </h3>
                  <p className="font-medium text-xs text-[#62567a]">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex mb-4">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      className="w-[18px] h-4"
                      alt="Star"
                      src="../../src/components/imges/star-6.svg"
                    />
                  ))}
                  <img className="w-[17px] h-4" alt="Star" src="../../src/components/imges/star-9.png" />
                </div>
                <p className="text-gray-500 text-sm leading-[22px] mb-4">
                  {testimonial.text}
                </p>
                <a href="#" className="text-[#1c70ff] text-sm underline">
                  voir plus
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
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

      {/* Footer */}
      <footer className="w-full bg-[#111820] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img
                  className="w-[33px] h-[42px] object-cover"
                  alt="Logo"
                  src="../../src/components/imges/logo-removebg-preview-1-1.png"
                />
                <span className="font-semibold text-xl">ROFEO Academy</span>
              </div>
              <p className="text-[#ffffffcc] text-sm leading-[30px]">
                ROFEO Academy est spécialisée dans les formations pour enfants en robotique, programmation et intelligence artificielle.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-base mb-6">Company</h3>
              <ul className="space-y-3">
                <li className="text-[#ffffffcc] text-sm">Home</li>
                <li className="text-[#ffffffcc] text-sm">About us</li>
                <li className="text-[#ffffffcc] text-sm">Contact us</li>
                <li className="text-[#ffffffcc] text-sm">Privacy policy</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-base mb-6">
                Subscribe to our newsletter
              </h3>
              <p className="text-[#ffffffcc] text-sm leading-[22px] mb-6">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex">
                <Input
                  className="bg-gray-800 border-[#6b72804c] text-gray-500 rounded-r-none h-[38px]"
                  placeholder="Enter your email"
                />
                <Button className="bg-blue-600 rounded-l-none h-[38px]">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-white/20 my-6" />

          <div className="text-center">
            <p className="text-[#ffffff99] text-[15px]">
              Copyright 2025 © rofeo. All Right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;