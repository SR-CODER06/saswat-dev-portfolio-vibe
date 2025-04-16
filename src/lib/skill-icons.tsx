
import { 
  Code2, Github, FileJson, Blocks, RadioTower, Database, GitBranch, Layout, 
  BookOpen, Laptop, Monitor, Braces, Cpu, Globe, Phone, Server, TerminalSquare,
  Mountain, FileCheck
} from "lucide-react";

export const getSkillIcon = (skillName: string) => {
  const icons: { [key: string]: JSX.Element } = {
    "HTML": <Layout className="w-5 h-5" />,
    "CSS": <Braces className="w-5 h-5" />,
    "JavaScript": <FileJson className="w-5 h-5" />,
    "React": <Blocks className="w-5 h-5" />,
    "React Native": <Phone className="w-5 h-5" />,
    "Node.js": <Server className="w-5 h-5" />,
    "Express.js": <RadioTower className="w-5 h-5" />,
    "MongoDB": <Database className="w-5 h-5" />,
    "Git": <GitBranch className="w-5 h-5" />,
    "GitHub": <Github className="w-5 h-5" />,
    "Tailwind": <Mountain className="w-5 h-5" />,
    "Bootstrap": <Globe className="w-5 h-5" />,
    "Java (SE)": <Cpu className="w-5 h-5" />,
    "C": <TerminalSquare className="w-5 h-5" />,
    "Django REST Framework": <BookOpen className="w-5 h-5" />,
    "Swift": <FileCheck className="w-5 h-5" />,
  };

  return icons[skillName] || <Code2 className="w-5 h-5" />;
};
