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
    gradient: "from-blue-500/20 to-cyan-500/20",
    icon: "🎨"
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "Java (SE)", "C", "Django REST Framework"],
    gradient: "from-green-500/20 to-emerald-500/20",
    icon: "⚙️"
  },
  {
    name: "Mobile",
    skills: ["React Native", "Swift"],
    gradient: "from-purple-500/20 to-pink-500/20",
    icon: "📱"
  },
  {
    name: "Tools & Others",
    skills: ["Git", "GitHub"],
    gradient: "from-orange-500/20 to-yellow-500/20",
    icon: "🛠️"
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="py-20 section-padding overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">My Skills</h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <motion.div 
                className="relative bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    background: [
                      "radial-gradient(circle at 0% 0%, transparent 0%, transparent 100%)",
                      "radial-gradient(circle at 100% 100%, transparent 0%, transparent 100%)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 bg-background/50 backdrop-blur px-3 py-2 rounded-lg border border-primary/10"
                    >
                      <motion.div
                        animate={{
                          rotateZ: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: skillIndex * 0.2,
                        }}
                      >
                        {getSkillIcon(skill)}
                      </motion.div>
                      <span className="text-sm font-medium">{skill}</span>
                      
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        initial={false}
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(var(--primary), 0)",
                            "0 0 20px rgba(var(--primary), 0.3)",
                            "0 0 0px rgba(var(--primary), 0)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
