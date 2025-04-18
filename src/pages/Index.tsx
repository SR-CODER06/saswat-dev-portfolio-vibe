import { motion, useScroll, useSpring } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import SplashCursor from "@/components/SplashCursor";
import StarryBackground from "@/components/StarryBackground";

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
  const [scrollThrottleTimer, setScrollThrottleTimer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth > 768);

    const handleScroll = () => {
      if (scrollThrottleTimer === null) {
        const newTimer = window.setTimeout(() => {
          setShowScrollTop(window.scrollY > 500);
          setScrollThrottleTimer(null);
        }, 200);

        setScrollThrottleTimer(newTimer);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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
