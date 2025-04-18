
import React, { ReactNode, memo } from "react";
import { motion } from "framer-motion";

interface TextPressureProps {
  children: ReactNode;
  className?: string;
}

const TextPressure = memo(({ children, className = "" }: TextPressureProps) => {
  const hoverVariants = {
    initial: { 
      scale: 1,
      color: "currentColor",
    },
    hover: { 
      scale: 1.02, 
      color: "hsl(var(--primary))",
      transition: { duration: 0.15 } 
    },
    tap: { 
      scale: 0.98 
    }
  };
  
  const underlineVariants = {
    initial: { 
      scaleX: 0, 
      opacity: 0 
    },
    hover: { 
      scaleX: 1, 
      opacity: 1,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.span
      className={`inline-block relative cursor-pointer ${className}`}
      variants={hoverVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      style={{ 
        willChange: "transform, color",
      }}
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
        style={{ 
          transformOrigin: "left center",
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

