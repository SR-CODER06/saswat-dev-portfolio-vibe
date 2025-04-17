
import { useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface UseCursorEffectOptions {
  intensity?: number;
  smoothness?: number;
  fps?: number;
}

export function useCursorEffect({ 
  intensity = 1, 
  smoothness = 0.08, 
  fps = 60 
}: UseCursorEffectOptions = {}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    // Calculate the frame interval based on the desired FPS
    const frameInterval = 1000 / fps;
    
    let animationFrameId: number;
    let lastUpdateTime = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    
    const updateMousePosition = (timestamp: number) => {
      // Throttle updates based on the desired frame rate
      if (timestamp - lastUpdateTime > frameInterval) {
        lastUpdateTime = timestamp;
        
        // Apply smoothness via linear interpolation
        const currentX = mouseX.get();
        const currentY = mouseY.get();
        
        const newX = currentX + (targetX - currentX) * smoothness * intensity;
        const newY = currentY + (targetY - currentY) * smoothness * intensity;
        
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

export function useTransformedCursorEffect(options: UseCursorEffectOptions = {}) {
  const { mouseX, mouseY } = useCursorEffect(options);
  
  // Transform the mouse position for more efficient rendering
  const transformedX = useTransform(mouseX, (x) => Math.round(x));
  const transformedY = useTransform(mouseY, (y) => Math.round(y));
  
  return { mouseX: transformedX, mouseY: transformedY };
}
