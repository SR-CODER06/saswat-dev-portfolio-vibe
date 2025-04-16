
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { getSkillIcon } from "@/lib/skill-icons";

const skills = [
  "HTML", "CSS", "JavaScript", "React", "React Native", "Node.js",
  "Express.js", "MongoDB", "Git", "GitHub", "Tailwind", "Bootstrap",
  "Java (SE)", "C", "Django REST Framework", "Swift",
];

const categories = [
  {
    name: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "Java (SE)", "C", "Django REST Framework"],
  },
  {
    name: "Mobile",
    skills: ["React Native", "Swift"],
  },
  {
    name: "Tools & Others",
    skills: ["Git", "GitHub"],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Thread animation variants - enhanced
  const threadVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: i * 0.1,
        duration: 1.5,
        ease: "easeInOut"
      },
    }),
  };

  // Container variant for skill categories
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Item variants for the skill items - enhanced
  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // Text pressure effect for skill names
  const TextPressure = ({ children }: { children: React.ReactNode }) => {
    const [isPressed, setIsPressed] = useState(false);
    
    return (
      <motion.span
        className="inline-block cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        animate={{
          color: isPressed ? "hsl(var(--primary))" : "currentColor",
          fontWeight: isPressed ? "700" : "inherit"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {children}
      </motion.span>
    );
  };

  return (
    <section id="skills" className="py-20 section-padding overflow-hidden relative">
      {/* Enhanced Shape blur background effect */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.7 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.6 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[150px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.5 : 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[180px] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="section-heading">
            <TextPressure>My Skills</TextPressure>
          </h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <TextPressure>These are the technologies I've worked with and I'm comfortable using:</TextPressure>
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative group backdrop-blur-sm"
            >
              {/* Enhanced category card with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
              
              {/* Threading effect around the card */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <svg className="absolute inset-0 w-full h-full">
                  <motion.rect
                    width="100%"
                    height="100%"
                    rx="12"
                    ry="12"
                    fill="none"
                    stroke="hsl(var(--primary) / 0.3)"
                    strokeWidth="1"
                    strokeDasharray="8 8"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? 
                      { 
                        pathLength: [0, 1], 
                        opacity: [0, 0.8, 0.2],
                        strokeDashoffset: [0, -100]
                      } : 
                      { pathLength: 0 }
                    }
                    transition={{ 
                      duration: 3, 
                      delay: categoryIndex * 0.2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </svg>
              </div>
              
              <div className="p-6">
                <motion.h3 
                  className="font-display text-xl font-bold mb-6 text-center relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ delay: categoryIndex * 0.1 + 0.3 }}
                >
                  <TextPressure>{category.name}</TextPressure>
                  <motion.span 
                    className="block w-12 h-1 bg-primary/50 mx-auto mt-2 rounded"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : { width: 0 }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 + 0.5 }}
                  ></motion.span>
                </motion.h3>

                <div className="flex flex-wrap gap-3 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      custom={skillIndex}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "hsl(var(--primary) / 0.2)",
                      }}
                      className="relative group/skill bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primary/20 transition-all"
                    >
                      <motion.div 
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: skillIndex * 0.1,
                        }}
                      >
                        {getSkillIcon(skill)}
                      </motion.div>
                      <TextPressure>{skill}</TextPressure>
                      
                      {/* Enhanced Thread effect */}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                          delay: skillIndex * 0.1,
                        }}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
                      ></motion.span>
                      
                      {/* Pulse effect on hover */}
                      <motion.span
                        className="absolute inset-0 rounded-lg bg-primary/0"
                        initial={{ opacity: 0 }}
                        whileHover={{
                          opacity: [0, 0.2, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      ></motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div 
            className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 rounded-xl backdrop-blur-sm relative overflow-hidden"
            whileHover={{ boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)" }}
          >
            {/* Threading effect around the card */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <svg className="absolute inset-0 w-full h-full">
                <motion.rect
                  width="100%"
                  height="100%"
                  rx="12"
                  ry="12"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.3)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? 
                    { 
                      pathLength: 1, 
                      strokeDasharray: ["1, 30", "30, 200"],
                      strokeDashoffset: [0, 100]
                    } : 
                    { pathLength: 0 }
                  }
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </svg>
            </div>
            
            <h3 className="font-display text-xl font-bold mb-5 text-center">
              <TextPressure>All Skills</TextPressure>
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                  }}
                >
                  {/* Enhanced aurora effect for skill pill */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/20 to-secondary/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>
                  
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      ease: "easeInOut",
                      delay: index * 0.2 
                    }}
                  >
                    {getSkillIcon(skill)}
                  </motion.div>
                  <TextPressure>{skill}</TextPressure>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
