
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import TextPressure from "./TextPressure";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <TextPressure>
            <h2 className="section-heading">Get In Touch</h2>
          </TextPressure>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <TextPressure>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Feel free to contact with me. Let's Talk. Don't wish for it! Work for it!
            </p>
          </TextPressure>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <TextPressure>
                <h3 className="font-display text-xl font-bold mb-6">Send me a message</h3>
              </TextPressure>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <TextPressure>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                  </TextPressure>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="mb-4">
                  <TextPressure>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                  </TextPressure>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="mb-6">
                  <TextPressure>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                  </TextPressure>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter your message"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TextPressure>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </TextPressure>
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="h-full flex flex-col">
              <div className="bg-gradient-to-br from-primary via-secondary to-accent p-6 rounded-xl text-white mb-6">
                <TextPressure>
                  <h3 className="font-display text-xl font-bold mb-6">Contact Information</h3>
                </TextPressure>
                <TextPressure>
                  <p className="mb-6">
                    I'm open for freelance opportunities and full-time positions. Feel free to reach out if you have a project in mind or want to work together!
                  </p>
                </TextPressure>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <TextPressure>
                        <p className="text-sm text-white/70">Email</p>
                      </TextPressure>
                      <TextPressure>
                        <a href="mailto:contact@saswatmohanty.com" className="hover:underline">
                          contact@saswatmohanty.com
                        </a>
                      </TextPressure>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <TextPressure>
                        <p className="text-sm text-white/70">Location</p>
                      </TextPressure>
                      <TextPressure>
                        <p>Bhubaneswar, Odisha, India</p>
                      </TextPressure>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <TextPressure>
                        <p className="text-sm text-white/70">Phone</p>
                      </TextPressure>
                      <TextPressure>
                        <p>+91 98765 43210</p>
                      </TextPressure>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="bg-card p-6 rounded-xl shadow-sm flex-1 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <TextPressure>
                    <h4 className="font-display text-lg font-bold mb-2">Let's Connect</h4>
                  </TextPressure>
                  <div className="flex justify-center gap-4 mt-4">
                    {[1, 2, 3, 4].map((_, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="sr-only">Social Media {index + 1}</span>
                        {/* Add social icons here when available */}
                        <TextPressure>{index + 1}</TextPressure>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
