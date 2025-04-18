
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
    stiffness: 30, // Much lower stiffness for smoother animation
    damping: 15,  // Lower damping
    restDelta: 0.02, // Higher threshold to stop animation sooner
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollThrottleTimer, setScrollThrottleTimer] = useState<number | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth > 768);
    
    // Very throttled scroll handler for better performance
    const handleScroll = () => {
      if (scrollThrottleTimer === null) {
        const newTimer = window.setTimeout(() => {
          setShowScrollTop(window.scrollY > 500);
          setScrollThrottleTimer(null);
        }, 200); // 200ms throttle
        
        setScrollThrottleTimer(newTimer);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check for window resize to disable cursor on mobile
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollThrottleTimer) window.clearTimeout(scrollThrottleTimer);
    };
  }, [scrollThrottleTimer]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative scroll-optimized">
      {/* Only render cursor effect on desktop */}
      {isMounted && isDesktop && <SplashCursor />}
      
      {/* Lazy load the starry background */}
      <Suspense fallback={null}>
        {isMounted && <StarryBackground />}
      </Suspense>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0% 0%" }}
      />
      
      <div>
        <Navbar />
        <HeroSection />
        <div className="content-visibility-auto">
          <AboutSection />
        </div>
        <div className="content-visibility-auto">
          <ExperienceSection />
        </div>
        <div className="content-visibility-auto">
          <SkillsSection />
        </div>
        <div className="content-visibility-auto">
          <ContactSection />
        </div>
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
    transition={{ duration: 0.2 }}
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
