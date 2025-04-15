
import { Code2, Github, FileJson, Blocks, RadioTower, Database, Git, Layout, Book, BookOpen, Laptop, Monitor } from "lucide-react";

export const getSkillIcon = (skillName: string) => {
  const icons: { [key: string]: JSX.Element } = {
    "HTML": <Layout className="w-5 h-5" />,
    "CSS": <Code2 className="w-5 h-5" />,
    "JavaScript": <FileJson className="w-5 h-5" />,
    "React": <Blocks className="w-5 h-5" />,
    "React Native": <Monitor className="w-5 h-5" />,
    "Node.js": <RadioTower className="w-5 h-5" />,
    "Express.js": <Laptop className="w-5 h-5" />,
    "MongoDB": <Database className="w-5 h-5" />,
    "Git": <Git className="w-5 h-5" />,
    "GitHub": <Github className="w-5 h-5" />,
    "Tailwind": <Book className="w-5 h-5" />,
    "Bootstrap": <BookOpen className="w-5 h-5" />,
  };

  return icons[skillName] || <Code2 className="w-5 h-5" />;
};
