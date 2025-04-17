
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Generate random stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3
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
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      
      // Update star positions for parallax effect
      setStars(prevStars => 
        prevStars.map(star => {
          const deltaX = (clientX - window.innerWidth / 2) * star.speedX * 0.01;
          const deltaY = (clientY - window.innerHeight / 2) * star.speedY * 0.01;
          
          return {
            ...star,
            x: (star.x + deltaX + window.innerWidth) % window.innerWidth,
            y: (star.y + deltaY + window.innerHeight) % window.innerHeight,
          };
        })
      );
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-black/5 to-black/10 z-[-1]">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            x: star.x,
            y: star.y,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`
          }}
          animate={{
            opacity: [star.opacity, star.opacity + 0.2, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
