
import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface TextPressureProps {
  children: ReactNode;
  className?: string;
}

// Performance-optimized TextPressure component
const TextPressure = memo(({ children, className = "" }: TextPressureProps) => {
  // Pre-defined animation variants to reduce calculations on hover
  const hoverVariants = {
    initial: { 
      scale: 1,
      // Using hex values instead of rgb/hsl for better color animation performance
      color: "#000000",
    },
    hover: { 
      scale: 1.02,
      color: "#8B5CF6",
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
      transition: { duration: 0.15 }
    }
  };

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      variants={hoverVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      // Reduce DOM changes with better will-change hints
      style={{ willChange: "transform" }}
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        variants={underlineVariants}
        initial="initial"
        // Using static will-change for better performance on animation
        style={{ willChange: "transform, opacity" }}
      />
    </motion.span>
  );
});

TextPressure.displayName = "TextPressure";

export default TextPressure;
