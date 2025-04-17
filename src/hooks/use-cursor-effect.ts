
import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

interface UseCursorEffectOptions {
  intensity?: number;
  smoothness?: number;
}

export function useCursorEffect({ intensity = 1, smoothness = 0.1 }: UseCursorEffectOptions = {}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    
    const updateMousePosition = () => {
      // Apply smoothness via linear interpolation
      const currentX = mouseX.get();
      const currentY = mouseY.get();
      
      const newX = currentX + (targetX - currentX) * smoothness * intensity;
      const newY = currentY + (targetY - currentY) * smoothness * intensity;
      
      mouseX.set(newX);
      mouseY.set(newY);
      
      animationFrameId = requestAnimationFrame(updateMousePosition);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updateMousePosition);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, smoothness, mouseX, mouseY]);
  
  return { mouseX, mouseY };
}
