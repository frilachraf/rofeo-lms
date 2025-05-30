import { useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

export const VideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full mx-auto py-16 px-4 flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-medium text-[#0e0e0e] mb-8">
          L'aventure ROFEO Academy commence ici !
        </h1>
        <p className="text-[#565656] text-base leading-6 mb-12">
          Inscrivez votre enfant dès maintenant et boostez ses compétences en robotique, 
          programmation et IA avec des ateliers innovants et passionnants !
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            // controls
            muted
            // playsInline
          >
            <source src="https://rmgcnvjloiiirvgedxvz.supabase.co/storage/v1/object/public/vd/vd/VID1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}; 

