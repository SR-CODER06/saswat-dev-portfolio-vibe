
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const SplashCursor = () => {
  const [isClicking, setIsClicking] = useState(false);
  const [splashes, setSplashes] = useState<Array<{ id: number, x: number, y: number }>>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const splashCounterRef = useRef(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct value setting for instant response
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      if (splashes.length < 1) {
        setSplashes([{
          id: splashCounterRef.current++,
          x: e.clientX,
          y: e.clientY
        }]);
        
        setTimeout(() => setSplashes([]), 300);
      }
    };
    
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [splashes.length]);
  
  return (
    <div className="fixed pointer-events-none inset-0 z-50">
      <motion.div
        className="fixed w-[40px] h-[40px] rounded-full mix-blend-screen pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 20%, transparent 60%)",
          opacity: 0.1,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        transition={{
          type: "tween",
          duration: 0.1
        }}
      />
      
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgb(139, 92, 246), rgb(236, 72, 153))",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        transition={{
          type: "tween",
          duration: 0.1
        }}
      />
      
      {splashes.map(splash => (
        <motion.div
          key={splash.id}
          className="fixed rounded-full mix-blend-screen pointer-events-none"
          style={{
            left: splash.x,
            top: splash.y,
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(45deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15))"
          }}
          initial={{ width: 0, height: 0, opacity: 0.3 }}
          animate={{ 
            width: 80,
            height: 80,
            opacity: 0 
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default SplashCursor;
