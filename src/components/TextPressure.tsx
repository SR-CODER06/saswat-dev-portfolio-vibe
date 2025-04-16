
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextPressureProps {
  children: ReactNode;
  className?: string;
}

const TextPressure = ({ children, className = "" }: TextPressureProps) => {
  return (
    <motion.span
      className={`inline-block cursor-pointer ${className}`}
      whileHover={{ 
        scale: 1.05,
        color: "hsl(var(--primary))",
        textShadow: "0 0 8px hsl(var(--primary) / 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.span>
  );
};

export default TextPressure;
