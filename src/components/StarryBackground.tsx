
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useCursorEffect } from "@/hooks/use-cursor-effect";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const { mouseX, mouseY } = useCursorEffect({ 
    smoothness: 0.02,
    intensity: 0.1,
    fps: 15
  });
  
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const animationRef = useRef<number>();
  
  // Track mouse position with refs to avoid re-renders
  useEffect(() => {
    const unsubscribeX = mouseX.onChange(latest => {
      mouseXRef.current = latest;
    });
    
    const unsubscribeY = mouseY.onChange(latest => {
      mouseYRef.current = latest;
    });
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY]);
  
  // Generate fewer stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 30000)); // Far fewer stars
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5, // Smaller stars
          opacity: Math.random() * 0.5 + 0.1, // Less bright
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    const handleResize = () => {
      // Debounce resize handling
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      animationRef.current = requestAnimationFrame(() => {
        generateStars();
      });
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-black/5 to-black/10 z-[-1]">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            x: star.x,
            y: star.y,
            boxShadow: `0 0 ${star.size}px rgba(255, 255, 255, ${star.opacity * 0.7})`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 1.2, star.opacity],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
