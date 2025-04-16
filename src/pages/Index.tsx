
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

// Splash Cursor Component
const SplashCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        setIsPointer(
          computedStyle.cursor === 'pointer' || 
          element.tagName === 'A' || 
          element.tagName === 'BUTTON' ||
          element.classList.contains('cursor-pointer')
        );
      } else {
        setIsPointer(false);
      }
    };
    
    const handleClick = (e: MouseEvent) => {
      setClicked(true);
      
      // Create multiple splash particles for better effect
      for (let i = 0; i < 3; i++) {
        const splash = document.createElement('div');
        splash.className = 'fixed pointer-events-none rounded-full mix-blend-difference';
        splash.style.left = `${e.clientX}px`;
        splash.style.top = `${e.clientY}px`;
        splash.style.backgroundColor = `hsl(var(--primary) / ${0.2 - i * 0.05})`;
        splash.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(splash);
        
        setTimeout(() => {
          splash.style.transition = `all ${600 + i * 100}ms cubic-bezier(0.1, 0.8, 0.3, 1)`;
          splash.style.width = `${200 + i * 50}px`;
          splash.style.height = `${200 + i * 50}px`;
          splash.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
          document.body.removeChild(splash);
        }, 800 + i * 100);
      }
      
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
        ref={cursorRef}
        className="fixed top-0 left-0 mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          restDelta: 0.001,
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div 
          className="rounded-full border-2 border-primary"
          animate={{
            width: isPointer ? '30px' : '20px',
            height: isPointer ? '30px' : '20px',
            opacity: 0.8
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      {clicked && (
        <motion.div
          className="fixed top-0 left-0 rounded-full bg-primary/30 mix-blend-difference"
          initial={{ 
            x: position.x,
            y: position.y,
            scale: 0, 
            opacity: 1,
            translateX: '-50%',
            translateY: '-50%'
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

// Grid Distortion Background
const GridDistortion = () => {
  return (
    <div className="absolute inset-0 -z-10 grid grid-cols-12 grid-rows-12 opacity-20">
      {Array.from({ length: 144 }).map((_, i) => (
        <motion.div
          key={i}
          className="border-[0.5px] border-primary/20"
          initial={{ opacity: 0.2 }}
          animate={{ 
            scale: [1, 1.1 + Math.random() * 0.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
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
      <SplashCursor />
      
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
      {/* Enhanced Aurora effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/40 to-secondary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow"></div>
      
      <ArrowUp className="h-5 w-5 relative z-10" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  </motion.div>
);

export default Index;
