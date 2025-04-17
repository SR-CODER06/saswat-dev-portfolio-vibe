
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
    const handleMouseMove = (e: MouseEvent) => {
      // Apply smoothness via linear interpolation
      const currentX = mouseX.get();
      const currentY = mouseY.get();
      
      const newX = currentX + (e.clientX - currentX) * smoothness * intensity;
      const newY = currentY + (e.clientY - currentY) * smoothness * intensity;
      
      mouseX.set(newX);
      mouseY.set(newY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity, smoothness]);
  
  return { mouseX, mouseY };
}
