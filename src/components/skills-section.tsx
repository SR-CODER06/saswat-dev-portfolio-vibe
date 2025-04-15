
import { motion } from "framer-motion";
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
];

const categories = [
  {
    name: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Bootstrap"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "Java (SE)", "C"],
  },
  {
    name: "Mobile",
    skills: ["React Native"],
  },
  {
    name: "Tools & Others",
    skills: ["Git", "GitHub"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-display text-lg font-bold mb-4 text-center">{category.name}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.3 }
                    }}
                    viewport={{ once: true }}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-primary/20 transition-colors"
                  >
                    {getSkillIcon(skill)}
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-6 rounded-xl">
            <h3 className="font-display text-xl font-bold mb-3">All Skills</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="bg-background px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-primary/10 transition-colors"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  transition={{ delay: 0.05 * index }}
                  viewport={{ once: true }}
                >
                  {getSkillIcon(skill)}
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
