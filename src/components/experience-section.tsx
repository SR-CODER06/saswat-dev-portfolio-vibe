
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Calendar, MapPin, Building, Clock } from "lucide-react";
import { experiences } from "@/data/experience";
import TextPressure from "./TextPressure";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001 
  });

  // Create a sequence of ranges for each experience card
  const rangePerCard = 1 / experiences.length;
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Update active card based on scroll position
  scrollYProgress.on("change", (latest) => {
    const newIndex = Math.min(
      experiences.length - 1,
      Math.floor(latest / rangePerCard)
    );
    if (newIndex !== activeCardIndex) {
      setActiveCardIndex(newIndex);
    }
  });

  return (
    <section id="experience" className="py-20 bg-muted/30 min-h-screen relative overflow-hidden">
      {/* Background blur effect - optimized with fewer elements */}
      <div className="absolute -z-10 inset-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-1/4 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
          style={{ willChange: "opacity" }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-1/4 -left-20 w-96 h-96 rounded-full bg-secondary/20 blur-[100px]"
          style={{ willChange: "opacity" }}
        />
      </div>

      <div className="container mx-auto" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
          className="mb-16 text-center"
        >
          <TextPressure>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              Work Experience
            </h2>
          </TextPressure>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <TextPressure>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey in software development:
            </p>
          </TextPressure>
        </motion.div>

        {/* Sticky Experience Cards - Optimized for performance */}
        <div className="relative h-[200vh]">
          <div className="sticky top-[20vh] min-h-[60vh] flex items-center justify-center px-4">
            {experiences.map((experience, index) => {
              // Calculate card opacity based on active index
              const isActive = index === activeCardIndex;
              
              return (
                <motion.div
                  key={`experience-${index}`}
                  className="w-full max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : (index < activeCardIndex ? -100 : 100),
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ 
                    position: 'absolute',
                    willChange: 'transform, opacity',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className="flex gap-6">
                    {/* Timeline dot with icon */}
                    <div className="relative">
                      <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center mt-1 border border-primary/30"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <Briefcase className="h-5 w-5 text-primary" />
                      </motion.div>
                      
                      {/* Timeline connector */}
                      {index !== experiences.length - 1 && (
                        <div className="absolute top-16 h-[100px] left-6 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10">
                        </div>
                      )}
                    </div>
                    
                    {/* Experience card with reduced complexity */}
                    <Card className="flex-1 overflow-hidden border border-primary/10 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-8">
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
                        
                        <ScrollArea className="max-h-24 overflow-auto mt-6">
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, skillIndex) => (
                              <motion.span 
                                key={skillIndex}
                                className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full backdrop-blur-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + skillIndex * 0.05 }}
                                whileHover={{ 
                                  backgroundColor: "hsl(var(--primary) / 0.2)",
                                  scale: 1.05
                                }}
                              >
                                <TextPressure>{skill}</TextPressure>
                              </motion.span>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}

            {/* Progress indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
              {experiences.map((_, index) => (
                <motion.div 
                  key={`indicator-${index}`}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  animate={{
                    scale: index === activeCardIndex ? 1.5 : 1,
                    backgroundColor: index === activeCardIndex ? 
                      "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.5)"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
