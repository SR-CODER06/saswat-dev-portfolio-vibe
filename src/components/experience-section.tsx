
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Building, Clock } from "lucide-react";
import { useState } from "react";
import { experiences } from "@/data/experience";
import TextPressure from "./TextPressure";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Optimized animation variants with reduced intensity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, // Reduced stagger time
        delayChildren: 0.1 // Reduced delay
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 }, // Reduced distance
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "tween", // Use tween instead of spring for better performance
        duration: 0.2  // Shorter duration
      }
    }
  };

  const handleExperienceChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="experience" className="py-16 bg-muted/30 relative content-visibility-auto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} // Reduced distance
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }} // Faster transition
          viewport={{ once: true, amount: 0.1 }} // Reduced threshold for animation
          className="mb-12 text-center" // Reduced margin
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3"> {/* Reduced size and margin */}
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-primary/50 mx-auto mb-3"></div> {/* Reduced size and margin */}
          <p className="text-muted-foreground max-w-xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6"> {/* Reduced gap */}
          {/* Experience Navigation */}
          <motion.div 
            className="md:col-span-4 lg:col-span-3 md:sticky md:top-24 self-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-card/70 backdrop-blur-sm rounded-lg border border-border p-3"> {/* Reduced padding */}
              <h3 className="font-medium text-lg mb-3 text-primary">Timeline</h3>
              <div className="flex flex-col space-y-1"> {/* Reduced spacing */}
                {experiences.map((experience, index) => (
                  <button
                    key={index}
                    onClick={() => handleExperienceChange(index)}
                    className={`p-2 text-left rounded-lg transition ${
                      activeIndex === index 
                        ? "bg-primary/10 border-l-2 border-primary" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="font-medium">
                      {experience.company}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {experience.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            className="md:col-span-8 lg:col-span-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                className={`${activeIndex === index ? "block" : "hidden"}`}
              >
                <Card className="overflow-hidden border border-border bg-card/60 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 border-b border-border pb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold mb-1 text-foreground">
                          {experience.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary">
                          <Building className="h-4 w-4" />
                          <span>{experience.company}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{experience.duration}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{experience.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{experience.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                      <p className="text-foreground border-l-2 border-primary/30 pl-4">
                        {experience.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Skills & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                            style={{ 
                              color: 'rgb(var(--primary-rgb))',
                              backgroundColor: 'rgba(var(--primary-rgb), 0.1)'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
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
