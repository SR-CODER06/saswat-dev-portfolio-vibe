
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface SocialLink {
  href: string;
  icon: LucideIcon;
  name: string;
}

export const socialLinks: SocialLink[] = [
  {
    href: "#",
    icon: Github,
    name: "GitHub"
  },
  {
    href: "#",
    icon: Linkedin,
    name: "LinkedIn"
  },
  {
    href: "#",
    icon: Twitter,
    name: "Twitter"
  },
  {
    href: "mailto:contact@saswatmohanty.com",
    icon: Mail,
    name: "Email"
  }
];

export const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];
