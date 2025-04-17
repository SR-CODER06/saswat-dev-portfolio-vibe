
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const SplashCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [splashes, setSplashes] = useState<Array<{ id: number, x: number, y: number }>>([]);
  
  // Glowing cursor light
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Handle mouse movements and clicks
  useEffect(() => {
    let splashCounter = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newSplash = {
        id: splashCounter++,
        x: e.clientX,
        y: e.clientY
      };
      
      setSplashes(prev => [...prev, newSplash]);
      
      // Remove splash after animation completes
      setTimeout(() => {
        setSplashes(prev => prev.filter(splash => splash.id !== newSplash.id));
      }, 1000);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  
  return (
    <div className="fixed pointer-events-none inset-0 z-50">
      {/* Main cursor glow effect */}
      <motion.div
        className="fixed w-[180px] h-[180px] rounded-full mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.6) 30%, transparent 70%)",
          opacity: 0.2,
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
          damping: 20
        }}
      />
      
      {/* Small focused cursor dot */}
      <motion.div
        className="fixed w-5 h-5 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgb(139, 92, 246), rgb(236, 72, 153))",
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.7)",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isClicking ? 0.6 : 1,
        }}
      />
      
      {/* Click splash effects */}
      {splashes.map(splash => (
        <motion.div
          key={splash.id}
          className="fixed rounded-full mix-blend-screen pointer-events-none"
          style={{
            left: splash.x,
            top: splash.y,
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(45deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4))"
          }}
          initial={{ width: 0, height: 0, opacity: 0.7 }}
          animate={{ 
            width: 300,
            height: 300,
            opacity: 0 
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default SplashCursor;
