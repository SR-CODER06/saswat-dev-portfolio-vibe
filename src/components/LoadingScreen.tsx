
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        animate={{ 
          scale: [0.8, 1, 0.8],
          rotate: [0, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-primary"
      >
        <Loader className="h-12 w-12" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
