
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import TextPressure from "./TextPressure";

export function AboutSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-20 section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <TextPressure>
            <h2 className="section-heading">About Me</h2>
          </TextPressure>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="gradient-border h-[400px] w-full overflow-hidden rounded-xl">
              <div className="bg-background h-full w-full rounded-xl flex items-center justify-center">
                <TextPressure className="text-6xl font-display font-bold gradient-text">SR</TextPressure>
                {/* You can replace the div above with an actual image when available */}
              </div>
            </div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-background glass p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <TextPressure>
                  <a href="mailto:contact@saswatmohanty.com" className="text-sm hover:text-primary transition-colors">
                    contact@saswatmohanty.com
                  </a>
                </TextPressure>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 -left-6 bg-background glass p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <TextPressure>
                  <span className="text-sm">Bhubaneswar, Odisha, India</span>
                </TextPressure>
              </div>
            </motion.div>
          </motion.div>

          {/* About Content */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={item} className="font-display text-2xl font-bold mb-4">
              <TextPressure>
                Software Development Engineer I (SDE 1) at HyScaler
              </TextPressure>
            </motion.h3>
            
            <motion.p variants={item} className="text-muted-foreground mb-6">
              <TextPressure>
                I'm a Software Development Engineer (SDE 1) at HyScaler, specializing in React, React Native, and Node.js. 
                With a Master's in Computer Applications, I focus on building responsive UIs and backend solutions. I'm passionate 
                about continuous learning and keeping up with industry trends.
              </TextPressure>
            </motion.p>
            
            <div className="mb-6">
              <motion.h4 variants={item} className="font-bold mb-2">
                <TextPressure>Education</TextPressure>
              </motion.h4>
              <motion.div variants={item} className="pl-4 border-l-2 border-primary mb-2">
                <TextPressure>
                  <p className="font-medium">MCA from United School of Business Management, Bhubaneswar</p>
                </TextPressure>
              </motion.div>
              <motion.div variants={item} className="pl-4 border-l-2 border-primary">
                <TextPressure>
                  <p className="font-medium">BSc from Utkal University</p>
                </TextPressure>
              </motion.div>
            </div>
            
            <motion.div variants={item} className="flex flex-wrap gap-2 mt-6">
              <motion.a
                href="#experience"
                className="btn-outline text-sm flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TextPressure>
                  My Experience
                </TextPressure>
              </motion.a>
              <motion.a
                href="#skills"
                className="btn-primary text-sm flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TextPressure>
                  My Skills
                </TextPressure>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
