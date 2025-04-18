
import { motion } from "framer-motion";
import { Calendar, MapPin, Building, Clock } from "lucide-react";
import { experiences } from "@/data/experience";
import TextPressure from "./TextPressure";
import { Card, CardContent } from "./ui/card";

export function ExperienceSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="experience" className="py-16 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-primary/50 mx-auto mb-3"></div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="transition-all duration-300 hover:scale-[1.02]"
            >
              <Card className="overflow-hidden border border-border bg-card/60 backdrop-blur-sm hover:shadow-lg hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold mb-2 text-foreground">
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
                    <p className="text-foreground pl-4 border-l-2 border-primary/30">
                      {experience.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
