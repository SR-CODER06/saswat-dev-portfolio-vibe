
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useCursorEffect } from "@/hooks/use-cursor-effect";

interface Star {
  id: number;
  x: number;
  y: number;
  z: number; // Added z-coordinate for 3D effect
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const { mouseX, mouseY } = useCursorEffect({ smoothness: 0.05 });
  
  // Generate random stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 12000); // Increased star count
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random() * 3, // z-coordinate for depth
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          orbitRadius: Math.random() * 5 + 2,
          orbitSpeed: Math.random() * 0.002 + 0.001,
          orbitAngle: Math.random() * Math.PI * 2
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle star movement with cursor parallax and orbital motion
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const animateStars = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (mouseX.get() && mouseY.get()) {
        const mouseXValue = mouseX.get();
        const mouseYValue = mouseY.get();
        
        setStars(prevStars => 
          prevStars.map(star => {
            // Calculate parallax effect based on cursor position
            const parallaxX = (mouseXValue - window.innerWidth / 2) * star.speedX * 0.008;
            const parallaxY = (mouseYValue - window.innerHeight / 2) * star.speedY * 0.008;
            
            // Update orbit angle
            const newOrbitAngle = star.orbitAngle + star.orbitSpeed * deltaTime;
            
            // Calculate circular motion
            const orbitX = Math.cos(newOrbitAngle) * star.orbitRadius;
            const orbitY = Math.sin(newOrbitAngle) * star.orbitRadius;
            
            // Combine parallax and orbital motion
            let newX = star.x + parallaxX + orbitX;
            let newY = star.y + parallaxY + orbitY;
            
            // Wrap around screen edges
            newX = (newX + window.innerWidth) % window.innerWidth;
            newY = (newY + window.innerHeight) % window.innerHeight;
            
            return {
              ...star,
              x: newX,
              y: newY,
              orbitAngle: newOrbitAngle,
            };
          })
        );
      }
      
      animationFrameId = requestAnimationFrame(animateStars);
    };
    
    animationFrameId = requestAnimationFrame(animateStars);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mouseX, mouseY]);
  
  return (
    <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-black/5 to-black/10 z-[-1]">
      {stars.map(star => {
        // Calculate size and opacity based on z-coordinate
        const scaleFactor = 1 - star.z * 0.2;
        const depthOpacity = star.opacity * (1 - star.z * 0.15);
        
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              x: star.x,
              y: star.y,
              width: star.size * scaleFactor,
              height: star.size * scaleFactor,
              opacity: depthOpacity,
              boxShadow: `0 0 ${star.size * 2 * scaleFactor}px rgba(255, 255, 255, ${depthOpacity})`,
              zIndex: Math.floor((1 - star.z) * 10) // Stars with lower z appear on top
            }}
            animate={{
              opacity: [depthOpacity, depthOpacity + 0.2, depthOpacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

export default StarryBackground;
