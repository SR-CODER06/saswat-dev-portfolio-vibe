
import React, { ReactNode, memo } from "react";
import { motion } from "framer-motion";

interface TextPressureProps {
  children: ReactNode;
  className?: string;
}

// Performance-optimized TextPressure component
const TextPressure = memo(({ children, className = "" }: TextPressureProps) => {
  // Pre-defined animation variants with reduced intensity
  const hoverVariants = {
    initial: { 
      scale: 1,
      color: "currentColor",
    },
    hover: { 
      scale: 1.01, // Reduced scale effect
      transition: { duration: 0.12 } // Faster transition
    },
    tap: { 
      scale: 0.99 
    }
  };
  
  const underlineVariants = {
    initial: { 
      scaleX: 0, 
      opacity: 0 
    },
    hover: { 
      scaleX: 1, 
      opacity: 0.8,
      transition: { duration: 0.12 } // Faster transition
    }
  };

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      variants={hoverVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      // Only apply hover animations to larger screens
      whileHover={window.innerWidth > 768 ? "hover" : "initial"}
      style={{ 
        willChange: "transform",
        // Use RGB values for colors to avoid HSL animation issues
        color: "currentColor" 
      }}
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{ 
          background: "currentColor",
          opacity: 0.3,
          willChange: "transform, opacity" 
        }}
        variants={underlineVariants}
        initial="initial"
      />
    </motion.span>
  );
});

TextPressure.displayName = "TextPressure";

export default TextPressure;
