
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { socialLinks, quickLinks } from "@/data/social-links";
import TextPressure from "./TextPressure";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* About */}
          <div>
            <motion.h3
              className="font-display text-xl font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <TextPressure>Saswat.dev</TextPressure>
            </motion.h3>
            <motion.p
              className="text-muted-foreground text-sm mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TextPressure>
                Junior Software Developer specialized in React, React Native, and Node.js development. Based in Bhubaneswar, Odisha, India.
              </TextPressure>
            </motion.p>
            
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <motion.h3
              className="font-display text-lg font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <TextPressure>Quick Links</TextPressure>
            </motion.h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
                  >
                    <ChevronRight className="h-3 w-3" />
                    <TextPressure>{link.label}</TextPressure>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <motion.h3
              className="font-display text-lg font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <TextPressure>Contact</TextPressure>
            </motion.h3>
            <motion.div
              className="space-y-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p><TextPressure>Bhubaneswar, Odisha, India</TextPressure></p>
              <p><TextPressure>contact@saswatmohanty.com</TextPressure></p>
              <p><TextPressure>+91 98765 43210</TextPressure></p>
            </motion.div>
          </div>
          
          {/* Newsletter */}
          <div>
            <motion.h3
              className="font-display text-lg font-bold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <TextPressure>Subscribe</TextPressure>
            </motion.h3>
            <motion.p
              className="text-muted-foreground text-sm mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TextPressure>
                Subscribe to my newsletter to get updates on my latest projects and tech articles.
              </TextPressure>
            </motion.p>
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-background border border-border focus:outline-none"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors">
                <TextPressure>Subscribe</TextPressure>
              </button>
            </motion.div>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <TextPressure>
              © {currentYear} Saswat Ranjan Mohanty. All rights reserved.
            </TextPressure>
          </motion.p>
          
          <motion.div
            className="text-sm text-muted-foreground flex gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <TextPressure>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            </TextPressure>
            <TextPressure>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </TextPressure>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
