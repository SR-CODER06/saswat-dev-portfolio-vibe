
import { useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface UseCursorEffectOptions {
  intensity?: number;
  smoothness?: number;
  fps?: number;
}

// Optimized cursor effect with better performance
export function useCursorEffect({ 
  intensity = 1, 
  smoothness = 0.08, 
  fps = 60 
}: UseCursorEffectOptions = {}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lastUpdateTimeRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  
  useEffect(() => {
    // Calculate the frame interval based on the desired FPS
    const frameInterval = 1000 / fps;
    
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetXRef.current = e.clientX;
      targetYRef.current = e.clientY;
    };
    
    const updateMousePosition = (timestamp: number) => {
      // Throttle updates based on the desired frame rate
      if (timestamp - lastUpdateTimeRef.current > frameInterval) {
        lastUpdateTimeRef.current = timestamp;
        
        // Apply smoothness via linear interpolation
        const currentX = mouseX.get();
        const currentY = mouseY.get();
        
        const newX = currentX + (targetXRef.current - currentX) * smoothness * intensity;
        const newY = currentY + (targetYRef.current - currentY) * smoothness * intensity;
        
        mouseX.set(newX);
        mouseY.set(newY);
      }
      
      animationFrameId = requestAnimationFrame(updateMousePosition);
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateMousePosition);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, smoothness, fps, mouseX, mouseY]);
  
  return { mouseX, mouseY };
}

// Use this optimized version for better performance in components
export function useTransformedCursorEffect(options: UseCursorEffectOptions = {}) {
  const { mouseX, mouseY } = useCursorEffect(options);
  
  // Reduce update frequency by rounding and only updating significant movements
  const transformedX = useTransform(mouseX, (x) => Math.round(x));
  const transformedY = useTransform(mouseY, (y) => Math.round(y));
  
  return { mouseX: transformedX, mouseY: transformedY };
}
