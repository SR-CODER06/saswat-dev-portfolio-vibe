
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getSkillIcon } from "@/lib/skill-icons";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "React Native",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Git",
  "GitHub",
  "Tailwind",
  "Bootstrap",
  "Java (SE)",
  "C",
  "Django REST Framework",
  "Swift",
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

  // Thread animation variants
  const threadVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
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

  // Item variants for the skill items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="skills" className="py-20 section-padding overflow-hidden relative">
      {/* Shape blur background effect */}
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.6 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.5 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.4 : 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-accent/20 blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="section-heading">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are the technologies I've worked with and I'm comfortable using:
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
              className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative group"
            >
              {/* Category card with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-6 text-center relative">
                  {category.name}
                  <span className="block w-12 h-1 bg-primary/50 mx-auto mt-2 rounded"></span>
                </h3>

                <div className="flex flex-wrap gap-3 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      custom={skillIndex}
                      variants={threadVariants}
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
                      <span>{skill}</span>
                      
                      {/* Thread effect */}
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
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="font-display text-xl font-bold mb-5 text-center">All Skills</h3>
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
                  {/* Aurora effect for skill pill */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>
                  
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
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
