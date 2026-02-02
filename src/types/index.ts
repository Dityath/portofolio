// Project Type
export interface Project {
  title: string;
  description: string;
  techStack: string[];
  thumbnail?: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

// Experience Type
export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  achievements: string[];
  techStack: string[];
}

// Skill Type
export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  proficiency: number; // 0-100
}

// Stat Type
export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

// Medium Post Type
export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
  readTime?: string;
}

// Social Link Type
export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}
