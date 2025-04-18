
import { motion, useScroll, useSpring } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import SplashCursor from "@/components/SplashCursor";
import StarryBackground from "@/components/StarryBackground";

// Lazy load sections for better performance
const HeroSection = lazy(() => import("@/components/hero-section").then(module => ({ default: module.HeroSection })));
const AboutSection = lazy(() => import("@/components/about-section").then(module => ({ default: module.AboutSection })));
const ExperienceSection = lazy(() => import("@/components/experience-section").then(module => ({ default: module.ExperienceSection })));
const SkillsSection = lazy(() => import("@/components/skills-section").then(module => ({ default: module.SkillsSection })));
const ContactSection = lazy(() => import("@/components/contact-section").then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import("@/components/footer").then(module => ({ default: module.Footer })));

// Section loading placeholder
const SectionPlaceholder = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="animate-pulse w-12 h-12 rounded-full bg-primary/30" />
  </div>
);

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.02,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use a more performant approach for scroll handling
  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth > 768);

    let scrollTimeout: number;
    const handleScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = window.setTimeout(() => {
        setShowScrollTop(window.scrollY > 500);
        scrollTimeout = 0;
      }, 100);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Load sections progressively with a slight delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative scroll-optimized">
      {isMounted && isDesktop && <SplashCursor />}
      
      <Suspense fallback={null}>
        {isMounted && <StarryBackground />}
      </Suspense>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0% 0%" }}
      />
      
      <div>
        <Navbar />
        <Suspense fallback={<SectionPlaceholder />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<SectionPlaceholder />}>
          <div className="content-visibility-auto">
            <AboutSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<SectionPlaceholder />}>
          <div className="content-visibility-auto">
            <ExperienceSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<SectionPlaceholder />}>
          <div className="content-visibility-auto">
            <SkillsSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<SectionPlaceholder />}>
          <div className="content-visibility-auto">
            <ContactSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
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
