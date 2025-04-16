
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SplashCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Glowing light that follows cursor
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };
    
    const handleClick = (e: MouseEvent) => {
      setClicked(true);
      
      // Create multiple splash particles for better effect
      for (let i = 0; i < 5; i++) {
        const splash = document.createElement('div');
        splash.className = 'fixed pointer-events-none rounded-full mix-blend-screen';
        splash.style.left = `${e.clientX}px`;
        splash.style.top = `${e.clientY}px`;
        splash.style.backgroundColor = `hsl(var(--primary) / ${0.3 - i * 0.05})`;
        splash.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(splash);
        
        setTimeout(() => {
          splash.style.transition = `all ${800 + i * 100}ms cubic-bezier(0.1, 0.8, 0.3, 1)`;
          splash.style.width = `${300 + i * 50}px`;
          splash.style.height = `${300 + i * 50}px`;
          splash.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
          document.body.removeChild(splash);
        }, 1000 + i * 100);
      }
      
      setTimeout(() => setClicked(false), 500);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);
  
  return (
    <div className="fixed pointer-events-none inset-0 z-50">
      {/* Glowing light effect */}
      <motion.div
        className="fixed w-[150px] h-[150px] rounded-full mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          opacity: 0.15,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      {clicked && (
        <motion.div
          className="fixed top-0 left-0 rounded-full bg-primary/30 mix-blend-screen"
          initial={{ 
            x: position.x,
            y: position.y,
            scale: 0, 
            opacity: 1,
            translateX: '-50%',
            translateY: '-50%'
          }}
          animate={{ 
            scale: 4, 
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        />
      )}
    </div>
  );
};

export default SplashCursor;
