import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MousePointer, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextPressure from "./TextPressure";

// Rotating text component
const RotatingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-primary inline-block min-w-[180px]"
    >
      {texts[index]}
    </motion.span>
  );
};

// Decrypted text effect
const DecryptedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    
    const decrypt = () => {
      interval = setInterval(() => {
        setDisplayText(prev => {
          const textLength = text.length - Math.floor(iteration);
          const remainingLength = textLength > 0 ? textLength : 0;
          
          return text.substring(0, Math.floor(iteration)) + 
            Array.from({ length: remainingLength })
              .map(() => characters[Math.floor(Math.random() * characters.length)])
              .join("");
        });
        
        iteration += 1/3;
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);
    };
    
    decrypt();
    return () => clearInterval(interval);
  }, [text]);
  
  return <span>{displayText}</span>;
};

// Text Cursor Component
const TextCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setIsTyping(true);
    const handleMouseUp = () => setIsTyping(false);
    
    // Blink effect
    const blinkInterval = setInterval(() => {
      setVisible(prev => !prev);
    }, 500);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(blinkInterval);
    };
  }, []);
  
  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        opacity: visible ? 1 : 0.5,
        height: isTyping ? '20px' : '30px'
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.5
      }}
    >
      <motion.div 
        className="w-[2px] h-full bg-primary"
        animate={{ 
          scaleY: isTyping ? [1, 0.7, 1] : 1 
        }}
        transition={{ 
          duration: 0.15, 
          repeat: isTyping ? Infinity : 0 
        }}
      />
    </motion.div>
  );
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for cursor follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for mouse
  const springConfig = { damping: 25, stiffness: 700 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Transform mouse position for parallax effect
  const rotateX = useTransform(smoothMouseY, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [0, window.innerWidth], [-5, 5]);
  
  // Handle mouse move for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      id="home" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center pt-16 section-padding relative overflow-hidden"
    >
      {/* Grid Distortion Background */}
      <div className="absolute inset-0 -z-10 grid grid-cols-12 grid-rows-12 opacity-20">
        {Array.from({ length: 144 }).map((_, i) => (
          <motion.div
            key={i}
            className="border-[0.5px] border-primary/20"
            initial={{ opacity: 0.2 }}
            animate={{ 
              scale: [1, 1.1 + Math.random() * 0.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Enhanced Background Decorations with Shape Blur */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[80px]"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-[120px]"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.7, 0.5, 0.7]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[150px] transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-primary/15 blur-[100px]"
          animate={{ 
            x: [0, 40, 0],
            y: [0, -40, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Mouse follow spotlight */}
      <motion.div 
        className="pointer-events-none absolute z-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="container mx-auto relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 backdrop-blur-sm border border-primary/20"
          >
            <motion.div
              animate={{ 
                background: ["linear-gradient(0deg, transparent, transparent)", 
                             "linear-gradient(0deg, hsl(var(--primary) / 0.2), transparent)",
                             "linear-gradient(0deg, transparent, transparent)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>I'm a <RotatingText texts={["MERN Developer", "Front-End Developer", "React Native Developer"]} /></span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ rotateX, rotateY }}
            className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 perspective-1000"
          >
            <TextPressure>Hi, I'm{" "}</TextPressure>
            <TextPressure className="gradient-text">
              <DecryptedText text="Saswat Ranjan" />
            </TextPressure>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-10"
          >
            <TextPressure>
              A passionate Front-end React Developer & MERN stack Developer based in Bhubaneswar.
            </TextPressure>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#contact"
              className="btn-primary flex items-center justify-center gap-2 group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Enhanced Aurora button effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow"></div>
              
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.a>
            
            <motion.a
              href="#projects"
              className="btn-outline flex items-center justify-center gap-2 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Enhanced Aurora button effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-secondary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow"></div>
              
              <span className="relative z-10">View Projects</span>
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <MousePointer className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
