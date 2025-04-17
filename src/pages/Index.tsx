
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import SplashCursor from "@/components/SplashCursor";

// Lazily load the starry background for better initial load performance
const StarryBackground = lazy(() => import("@/components/StarryBackground"));

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50, // Lower stiffness for smoother animation
    damping: 20, // Lower damping for smoother animation
    restDelta: 0.01, // Higher threshold for stopping the animation
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true); // For handling client-side only features
    
    // Throttled scroll handler for better performance
    let timeoutId: number | null = null;
    
    const handleScroll = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          if (window.scrollY > 500) {
            setShowScrollTop(true);
          } else {
            setShowScrollTop(false);
          }
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Only render cursor effect on desktop */}
      {isMounted && window.innerWidth > 768 && <SplashCursor />}
      
      {/* Lazy load the starry background */}
      <Suspense fallback={null}>
        {isMounted && <StarryBackground />}
      </Suspense>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0% 0%" }}
      />
      
      <div>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
      
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
      className="rounded-full shadow-lg h-10 w-10"
      variant="secondary"
    >
      <ArrowUp className="h-4 w-4" />
      <span className="sr-only">Scroll to top</span>
    </Button>
  </motion.div>
);

export default Index;
