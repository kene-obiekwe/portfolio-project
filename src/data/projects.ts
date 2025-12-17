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
    id: "ai-content-generator", // THIS IS YOUR DEDICATED PROJECT
    name: "AI-Powered Content Engine",
    shortDescription: "A sophisticated platform using NLP to generate optimized marketing copy and technical documentation.",
    fullDescription: "This project serves as a dedicated showcase of AI integration within a React frontend. It leverages Large Language Models to provide real-time, context-aware content generation.",
    techStack: ["React", "TypeScript", "OpenAI API", "Node.js"],
    imageUrl: "https://via.placeholder.com/600x400", 
    liveLink: "https://demo.example.com",
    githubLink: "https://github.com/example/ai-engine",
    problemSolved: "Traditional content creation is slow; this tool automates the process with technical precision.",
    features: ["Real-time Streaming", "Custom Prompting"],
    learningOutcome: "Mastered asynchronous API handling and prompt engineering."
  },
  {
    id: "student-data-viz",
    name: "Predictive Analytics Dashboard",
    shortDescription: "A data visualization tool designed to track and predict student performance using historical data.",
    fullDescription: "Built to simplify complex data sets, this dashboard provides educators with actionable insights.",
    techStack: ["Vite", "React", "Chart.js", "Firebase"],
    imageUrl: "https://via.placeholder.com/600x400",
    liveLink: "https://data.example.com",
    githubLink: "https://github.com/example/dashboard",
    problemSolved: "Identifies 'at-risk' students early through trend analysis.",
    features: ["Interactive Charts", "Auth"],
    learningOutcome: "Deepened knowledge of state management and data transformation."
  },
  {
    id: "vision-classifier",
    name: "Automated Image Recognition",
    shortDescription: "A machine learning model integrated into a web UI for real-time object classification and detection.",
    fullDescription: "An end-to-end computer vision project that allows users to upload images for instant AI analysis and tagging.",
    techStack: ["Python", "TensorFlow", "React", "Flask"],
    imageUrl: "https://via.placeholder.com/600x400",
    liveLink: "https://vision.example.com",
    githubLink: "https://github.com/example/vision",
    problemSolved: "Reduces manual data entry by automatically categorizing visual assets with 95% accuracy.",
    features: ["Batch Processing", "Model Confidence Scoring"],
    learningOutcome: "Learned to bridge the gap between Python-based ML models and React-based frontends."
  }
];