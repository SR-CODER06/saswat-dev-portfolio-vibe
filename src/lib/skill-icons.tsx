
import { 
  Code2, Github, FileJson, Blocks, RadioTower, Database, GitBranch, Layout, 
  BookOpen, Laptop, Monitor, Braces, Cpu, Globe, Phone, Server, TerminalSquare,
  Mountain, FileCheck, Sparkles
} from "lucide-react";

export const getSkillIcon = (skillName: string) => {
  const icons: { [key: string]: JSX.Element } = {
    // Frontend
    "HTML": <Layout className="w-5 h-5" />,
    "CSS": <Braces className="w-5 h-5" />,
    "JavaScript": <FileJson className="w-5 h-5" />,
    "React": <Blocks className="w-5 h-5 text-blue-400" />,
    "Tailwind": <Mountain className="w-5 h-5 text-cyan-500" />,
    "Bootstrap": <Globe className="w-5 h-5 text-purple-600" />,
    
    // Mobile
    "React Native": <Phone className="w-5 h-5 text-blue-400" />,
    "Swift": <FileCheck className="w-5 h-5 text-orange-500" />,
    
    // Backend
    "Node.js": <Server className="w-5 h-5 text-green-500" />,
    "Express.js": <RadioTower className="w-5 h-5" />,
    "MongoDB": <Database className="w-5 h-5 text-green-600" />,
    "Django REST Framework": <BookOpen className="w-5 h-5 text-emerald-600" />,
    
    // Languages
    "Java (SE)": <Cpu className="w-5 h-5 text-orange-600" />,
    "C": <TerminalSquare className="w-5 h-5 text-blue-700" />,
    
    // Tools & Others
    "Git": <GitBranch className="w-5 h-5 text-orange-500" />,
    "GitHub": <Github className="w-5 h-5" />,
  };

  return icons[skillName] || <Code2 className="w-5 h-5" />;
};
