
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, Building, Clock } from "lucide-react";
import { experiences } from "@/data/experience";
import TextPressure from "./TextPressure";

export function ExperienceSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  // Card slide-in variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        delay: i * 0.2,
      },
    }),
  };

  // Timeline animation variants
  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%", 
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-muted/30 section-padding relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute -z-10 inset-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.6 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-1/4 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.5 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-1/4 -left-20 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]"
        />
      </div>

      <div className="container mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <TextPressure>
            <h2 className="section-heading">Work Experience</h2>
          </TextPressure>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <TextPressure>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey in software development:
            </p>
          </TextPressure>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-16 relative"
            >
              {/* Timeline connector */}
              {index !== experiences.length - 1 && (
                <div className="absolute top-16 bottom-0 left-6 w-0.5 bg-muted-foreground/20 -z-10">
                  <motion.div 
                    className="h-full w-full bg-primary/50"
                    variants={lineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  />
                </div>
              )}
              
              <div className="flex gap-6">
                {/* Timeline dot with icon */}
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center mt-1 border border-primary/30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Briefcase className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>
                
                {/* Experience card with spotlight effect */}
                <motion.div 
                  className="bg-card rounded-xl p-8 shadow-lg flex-1 relative group overflow-hidden backdrop-blur-sm border border-primary/10"
                  whileHover={{ 
                    y: -5, 
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Spotlight effect */}
                  <div className="absolute -inset-px opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-xl transition-opacity duration-700"></div>
                  <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 duration-700 rounded-xl blur-sm group-hover:bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5"></div>
                  
                  <div className="flex justify-between items-start flex-wrap gap-4 mb-5">
                    <div>
                      <TextPressure>
                        <h3 className="font-display text-xl font-bold">{experience.title}</h3>
                      </TextPressure>
                      <div className="flex items-center gap-2 text-primary font-medium mt-1">
                        <Building className="h-4 w-4" />
                        <TextPressure>
                          <h4>{experience.company}</h4>
                        </TextPressure>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/80 px-4 py-1.5 rounded-full backdrop-blur-sm">
                      <Calendar className="h-3.5 w-3.5" />
                      <TextPressure>
                        <span>{experience.duration}</span>
                      </TextPressure>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <TextPressure>
                        <span>{experience.location}</span>
                      </TextPressure>
                    </div>
                    
                    <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <TextPressure>
                        <span>{experience.type}</span>
                      </TextPressure>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground my-4 border-l-2 border-primary/30 pl-4 italic">
                    <TextPressure>
                      {experience.description}
                    </TextPressure>
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {experience.skills.map((skill, skillIndex) => (
                      <motion.span 
                        key={skillIndex}
                        className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full backdrop-blur-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.5 + skillIndex * 0.1 + index * 0.2 }}
                        whileHover={{ 
                          backgroundColor: "hsl(var(--primary) / 0.2)",
                          scale: 1.05
                        }}
                      >
                        <TextPressure>{skill}</TextPressure>
                      </motion.span>
                    ))}
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
