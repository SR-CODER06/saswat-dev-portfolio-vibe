
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const SplashCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [splashes, setSplashes] = useState<Array<{ id: number, x: number, y: number }>>([]);
  
  // Glowing cursor light
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Handle mouse movements and clicks with optimizations
  useEffect(() => {
    let splashCounter = 0;
    let throttleTimer: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move updates
      if (!throttleTimer) {
        throttleTimer = window.setTimeout(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          throttleTimer = null;
        }, 20); // 50 fps throttle
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Limit number of active splashes to 3 for performance
      if (splashes.length < 3) {
        const newSplash = {
          id: splashCounter++,
          x: e.clientX,
          y: e.clientY
        };
        
        setSplashes(prev => [...prev, newSplash]);
        
        // Remove splash after animation completes
        setTimeout(() => {
          setSplashes(prev => prev.filter(splash => splash.id !== newSplash.id));
        }, 800);
      }
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [splashes.length]);
  
  return (
    <div className="fixed pointer-events-none inset-0 z-50">
      {/* Main cursor glow effect - reduced size and opacity */}
      <motion.div
        className="fixed w-[100px] h-[100px] rounded-full mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(236, 72, 153, 0.4) 20%, transparent 60%)",
          opacity: 0.15,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
      />
      
      {/* Small focused cursor dot */}
      <motion.div
        className="fixed w-3 h-3 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgb(139, 92, 246), rgb(236, 72, 153))",
          boxShadow: "0 0 5px rgba(139, 92, 246, 0.5)",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isClicking ? 0.6 : 1,
        }}
      />
      
      {/* Simplified click splash effects */}
      {splashes.map(splash => (
        <motion.div
          key={splash.id}
          className="fixed rounded-full mix-blend-screen pointer-events-none"
          style={{
            left: splash.x,
            top: splash.y,
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))"
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ 
            width: 150,
            height: 150,
            opacity: 0 
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default SplashCursor;
