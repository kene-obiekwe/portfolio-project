// src/data/projects.ts

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string; 
  techStack: string[];
  imageUrl: string;
  liveLink?: string;
  githubLink?: string;
  problemSolved: string;
  features: string[];
  learningOutcome: string;
}

export const myProjects: Project[] = [
  {
    id: "1",
    name: "Project One Name",
    shortDescription: "A brief 1-2 sentence summary for the homepage grid.",
    fullDescription: "A detailed explanation for your Dedicated Project Details Page.",
    techStack: ["React", "TypeScript", "Tailwind"],
    imageUrl: "https://via.placeholder.com/600x400", // Replace with your screenshot later
    liveLink: "https://your-live-link.com",
    githubLink: "https://github.com/yourusername/repo",
    problemSolved: "Explain the specific issue this app addresses.",
    features: ["Feature A", "Feature B", "Feature C"],
    learningOutcome: "What did this project teach you about frontend development?"
  },
  {
    id: "2",
    name: "Project Two Name",
    shortDescription: "Another brief summary to meet the 'minimum 2-3' requirement.",
    fullDescription: "Detailed breakdown of the second project.",
    techStack: ["Next.js", "Firebase"],
    imageUrl: "https://via.placeholder.com/600x400",
    problemSolved: "The problem this second project solved was...",
    features: ["Feature X", "Feature Y"],
    learningOutcome: "I learned how to manage database states..."
  }
];