
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Circle } from "lucide-react";

const SplashCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return (
    <div className="fixed pointer-events-none inset-0 z-50">
      <motion.div
        className="fixed w-6 h-6 rounded-full mix-blend-difference pointer-events-none border border-primary/50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: isHovering 
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)"
            : "transparent"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.7 : 0.5
        }}
        transition={{
          type: "tween",
          duration: 0.2
        }}
      >
        <Circle 
          className="w-full h-full text-primary/20 opacity-50" 
          strokeWidth={1} 
        />
      </motion.div>
    </div>
  );
};

export default SplashCursor;

