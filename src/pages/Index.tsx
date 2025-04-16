
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Splash cursor component
const SplashCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 500);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);
  
  return (
    <div className="fixed pointer-events-none inset-0 z-50">
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary mix-blend-difference"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          restDelta: 0.001,
        }}
      />
      
      {clicked && (
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 rounded-full bg-primary/30 mix-blend-difference"
          initial={{ 
            x: position.x - 20,
            y: position.y - 20,
            scale: 0, 
            opacity: 1,
          }}
          animate={{ 
            scale: 3, 
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        />
      )}
    </div>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true); // For handling client-side only features
    
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Only show splash cursor on client-side */}
      {isMounted && <SplashCursor />}
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX }}
      />
      
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      
      {/* Scroll to top button */}
      <AnimatedScrollTopButton show={showScrollTop} onClick={scrollToTop} />
    </div>
  );
};

const AnimatedScrollTopButton = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
  <motion.div
    className="fixed bottom-6 right-6 z-40"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0,
    }}
    transition={{ duration: 0.3 }}
  >
    <Button
      onClick={onClick}
      size="icon"
      className="rounded-full shadow-lg h-12 w-12 relative group overflow-hidden"
      variant="secondary"
    >
      {/* Aurora effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-secondary/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
      
      <ArrowUp className="h-5 w-5 relative z-10" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  </motion.div>
);

export default Index;
