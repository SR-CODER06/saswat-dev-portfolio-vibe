
import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface TextPressureProps {
  children: ReactNode;
  className?: string;
}

const TextPressure = memo(({ children, className = "" }: TextPressureProps) => {
  return (
    <motion.span
      className={`inline-block cursor-pointer relative ${className}`}
      whileHover={{ 
        scale: 1.02,
        color: "rgb(139, 92, 246)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.span>
  );
});

TextPressure.displayName = "TextPressure";

export default TextPressure;
