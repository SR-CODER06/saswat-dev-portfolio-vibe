
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Junior Software Developer",
    company: "HyScaler",
    duration: "Apr 2024 - Present (1 yr 1 mo)",
    location: "Bhubaneswar, Odisha, India · On-site",
    type: "Full-time",
    description: "Working on Django REST Framework, React Native, and developing multiple web and mobile applications.",
    skills: ["Django REST Framework", "React Native", "+5 skills"],
    logo: "/path_to_logo_image"
  },
  {
    title: "Apprentice Trainee",
    company: "HyScaler",
    duration: "Aug 2023 - Mar 2024 (8 mos)",
    location: "Bhubaneswar, Odisha, India · On-site",
    type: "Trainee",
    description: "Gaining hands-on experience in React.js, React Native, and other web technologies.",
    skills: ["React.js", "React Native", "+4 skills"],
    logo: "/path_to_logo_image"
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-muted/30 section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-10 relative"
            >
              {/* Timeline connector */}
              {index !== experiences.length - 1 && (
                <div className="absolute top-16 bottom-0 left-6 w-0.5 bg-primary/30 -z-10"></div>
              )}
              
              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mt-1"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Briefcase className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>
                
                {/* Experience card */}
                <motion.div 
                  className="bg-card rounded-xl p-6 shadow-sm flex-1"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold">{experience.title}</h3>
                      <h4 className="text-primary font-medium">{experience.company}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      <Calendar className="h-3 w-3" />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{experience.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <motion.span 
                        key={skillIndex}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-4">
                    {experience.location} · {experience.type}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
