
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextPressureProps {
  children: ReactNode;
  className?: string;
}

const TextPressure = ({ children, className = "" }: TextPressureProps) => {
  return (
    <motion.span
      className={`inline-block cursor-pointer relative ${className}`}
      whileHover={{ 
        scale: 1.05,
        color: "rgb(139, 92, 246)",
        textShadow: "0 0 8px rgba(139, 92, 246, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {children}
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  );
};

export default TextPressure;
