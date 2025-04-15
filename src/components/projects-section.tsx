
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    project_name: "Yelp-Camp",
    code_link: "https://github.com/...",
    description: "A campground reviewing and discovery platform, inspired by Yelp but focused on camping experiences.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    image: "/placeholder.svg"
  },
  {
    project_name: "Spotify-Music-App",
    code_link: "https://github.com/...",
    description: "A Spotify-like music streaming application with playlist creation and music discovery features.",
    tags: ["React", "Redux", "Node.js", "Spotify API"],
    image: "/placeholder.svg"
  },
  {
    project_name: "Movie-App",
    code_link: "https://github.com/...",
    description: "A movie browsing application that allows users to discover and search for films and TV shows.",
    tags: ["React", "TMDB API", "CSS"],
    image: "/placeholder.svg"
  },
  {
    project_name: "Zoom-Clone-App",
    code_link: "https://github.com/...",
    description: "A video conferencing application inspired by Zoom, with real-time communication features.",
    tags: ["React", "WebRTC", "Socket.io", "Node.js"],
    image: "/placeholder.svg"
  },
  {
    project_name: "Note-Taker",
    code_link: "https://github.com/...",
    description: "A note-taking application that allows users to create, edit, and organize notes.",
    tags: ["React", "LocalStorage", "CSS"],
    image: "/placeholder.svg"
  },
  {
    project_name: "Food-Ordering-App",
    code_link: "https://github.com/...",
    description: "A food delivery application that allows users to browse restaurants and place orders.",
    tags: ["React", "Firebase", "Tailwind CSS"],
    image: "/placeholder.svg"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-muted/30 section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="section-heading">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore my recent development projects that showcase my skills in web and mobile development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl overflow-hidden shadow-sm border border-border"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden bg-muted">
                <motion.img
                  src={project.image}
                  alt={project.project_name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Project Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold mb-2">{project.project_name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + tagIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.code_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:text-primary text-sm flex items-center gap-1 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </motion.a>
                  
                  <motion.a
                    href="#"
                    className="text-foreground hover:text-primary text-sm flex items-center gap-1 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
