
import { motion } from "framer-motion";
import { ReactNode, memo, useCallback } from "react";

interface TextPressureProps {
  children: ReactNode;
  className?: string;
}

const TextPressure = memo(({ children, className = "" }: TextPressureProps) => {
  // Memoize the animation variants to reduce re-renders
  const getHoverVariants = useCallback(() => ({
    initial: { 
      scale: 1,
      color: "currentColor",
    },
    hover: { 
      scale: 1.02,
      color: "rgb(139, 92, 246)",
      transition: { duration: 0.15 }
    },
    tap: { 
      scale: 0.98 
    }
  }), []);
  
  const getUnderlineVariants = useCallback(() => ({
    initial: { 
      scaleX: 0, 
      opacity: 0 
    },
    hover: { 
      scaleX: 1, 
      opacity: 1,
      transition: { duration: 0.15 }
    }
  }), []);

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      variants={getHoverVariants()}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        variants={getUnderlineVariants()}
        initial="initial"
        whileHover="hover"
      />
    </motion.span>
  );
});

TextPressure.displayName = "TextPressure";

export default TextPressure;
