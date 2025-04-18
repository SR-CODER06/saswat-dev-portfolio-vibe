
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const SplashCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [splashes, setSplashes] = useState<Array<{ id: number, x: number, y: number }>>([]);
  
  // Glowing cursor light
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const throttleTimerRef = useRef<number | null>(null);
  const splashCounterRef = useRef(0);
  const splashTimeoutRef = useRef<number | null>(null);
  
  // Handle mouse movements and clicks with extreme optimizations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Extreme throttle for mouse move
      if (!throttleTimerRef.current) {
        throttleTimerRef.current = window.setTimeout(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          throttleTimerRef.current = null;
        }, 40); // 25fps throttle
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Limit to only one splash at a time
      if (splashes.length < 1) {
        const newSplash = {
          id: splashCounterRef.current++,
          x: e.clientX,
          y: e.clientY
        };
        
        setSplashes([newSplash]);
        
        // Clear previous timeout
        if (splashTimeoutRef.current) clearTimeout(splashTimeoutRef.current);
        
        // Remove splash after animation completes
        splashTimeoutRef.current = window.setTimeout(() => {
          setSplashes([]);
          splashTimeoutRef.current = null;
        }, 600);
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
      if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
      if (splashTimeoutRef.current) clearTimeout(splashTimeoutRef.current);
    };
  }, [splashes.length]);
  
  return (
    <div className="fixed pointer-events-none inset-0 z-50">
      {/* Main cursor glow effect - reduced size and opacity */}
      <motion.div
        className="fixed w-[60px] h-[60px] rounded-full mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.3) 20%, transparent 60%)",
          opacity: 0.12,
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
          stiffness: 300,
          damping: 25
        }}
      />
      
      {/* Small focused cursor dot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgb(139, 92, 246), rgb(236, 72, 153))",
          boxShadow: "0 0 3px rgba(139, 92, 246, 0.4)",
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
            background: "linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))"
          }}
          initial={{ width: 0, height: 0, opacity: 0.3 }}
          animate={{ 
            width: 120,
            height: 120,
            opacity: 0 
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default SplashCursor;
