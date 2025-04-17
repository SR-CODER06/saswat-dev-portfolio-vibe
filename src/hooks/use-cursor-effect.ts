
import { useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface UseCursorEffectOptions {
  intensity?: number;
  smoothness?: number;
  fps?: number;
}

// Highly optimized cursor effect for better performance
export function useCursorEffect({ 
  intensity = 0.5, // Reduced intensity
  smoothness = 0.05, // Reduced smoothness 
  fps = 30 // Lower FPS for better performance
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
        
        // Apply smoothness via linear interpolation with reduced intensity
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
  const { mouseX, mouseY } = useCursorEffect({
    ...options,
    intensity: 0.3, // Further reduced for performance
    fps: 20 // Lower framerate
  });
  
  // Further reduce update frequency
  const transformedX = useTransform(mouseX, (x) => Math.round(x / 2) * 2);
  const transformedY = useTransform(mouseY, (y) => Math.round(y / 2) * 2);
  
  return { mouseX: transformedX, mouseY: transformedY };
}
