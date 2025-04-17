
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Building, Clock } from "lucide-react";
import { useState } from "react";
import { experiences } from "@/data/experience";
import TextPressure from "./TextPressure";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20
      }
    }
  };

  const handleExperienceChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="experience" className="py-20 bg-muted/30 min-h-[80vh] relative flex items-center">
      {/* Subtle background blur */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary/50 mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Experience Navigation */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3 md:sticky md:top-24 self-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-card/70 backdrop-blur-sm rounded-lg shadow-sm border border-border p-4">
              <h3 className="font-medium text-lg mb-4 text-primary">Timeline</h3>
              <div className="flex flex-col space-y-2">
                {experiences.map((experience, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants} 
                    onClick={() => handleExperienceChange(index)}
                    className={`p-3 text-left rounded-lg transition-all ${
                      activeIndex === index 
                        ? "bg-primary/10 border-l-2 border-primary" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="font-medium">
                      <TextPressure>{experience.company}</TextPressure>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {experience.duration}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            className="md:col-span-8 lg:col-span-9"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
                className={`${activeIndex === index ? "block" : "hidden"}`}
              >
                <Card className="overflow-hidden border border-border bg-card/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 border-b border-border pb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold mb-1 text-foreground">
                          <TextPressure>{experience.title}</TextPressure>
                        </h3>
                        <div className="flex items-center gap-2 text-primary">
                          <Building className="h-4 w-4" />
                          <TextPressure>
                            <span>{experience.company}</span>
                          </TextPressure>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <TextPressure>
                            <span>{experience.duration}</span>
                          </TextPressure>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <TextPressure>
                            <span>{experience.location}</span>
                          </TextPressure>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <TextPressure>
                            <span>{experience.type}</span>
                          </TextPressure>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                      <p className="text-foreground border-l-2 border-primary/30 pl-4">
                        <TextPressure>
                          {experience.description}
                        </TextPressure>
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills & Technologies</h4>
                      <ScrollArea className="max-h-24">
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill, skillIndex) => (
                            <motion.span 
                              key={skillIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + skillIndex * 0.05 }}
                              className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full"
                              style={{ 
                                color: 'rgb(var(--primary-rgb))',
                                backgroundColor: 'rgba(var(--primary-rgb), 0.1)'
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
