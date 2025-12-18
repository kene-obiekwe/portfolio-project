// src/data/projects.ts

// 1. IMPORT YOUR IMAGES
// Vite requires imports to process images located in the src folder
import toothFixerImg from '../assets/toothfixer-preview.png';
import osKernelImg from '../assets/os-preview.png';
import logisticsImg from '../assets/logistics-preview.png';

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
    id: "ai-content-generator", // Trigger for Requirement 4 (Dedicated Detail Page)
    name: "Tooth Fixers Management System",
    shortDescription: "A three-tier clinical record system built for managing patient biodata and dental history.",
    fullDescription: "A robust solution for a large dental practice, implementing a strict three-tier architecture (Web server <-> Framework <-> DBMS). It features a secure React frontend connected to a NestJS API and PostgreSQL database.",
    techStack: ["React", "NestJS", "PostgreSQL", "TypeORM", "TailwindCSS"],
    imageUrl: toothFixerImg,
    githubLink: "https://github.com/kene-obiekwe/web-app_projects.git",
    problemSolved: "Developed a multi-user clinical record system to replace manual record-keeping with a secure, scalable digital solution for dentists.",
    features: ["Complete Patient CRUD", "Relational Database Design", "One-to-many data mapping", "Branded Green-themed UI"],
    learningOutcome: "Mastered full-stack integration and the coordination of complex relational data across a multi-tier environment."
  },
  {
    id: "custom-os-kernel", // Requirement 2
    name: "Rust x86_64 Operating System",
    shortDescription: "A low-level kernel featuring custom framebuffer writers and hardware-level print macros.",
    fullDescription: "A custom OS kernel built from scratch in Rust. It interacts directly with hardware to manage screen output, cursor positioning, and UEFI boot protocols.",
    techStack: ["Rust", "x86_64", "UEFI", "QEMU", "Assembly"],
    imageUrl: osKernelImg,
    githubLink: "https://github.com/kene-obiekwe/csc308OS/tree/main/os_with_bootloader_CA_2",
    problemSolved: "Developed a custom FrameBufferWriter and print! macro to handle hardware-level text rendering, including overflow wrapping and automatic screen scrolling.",
    features: ["Custom print! macro", "Escape sequence handling (\\n, \\t)", "Automated screen scrolling", "UEFI Bootloader integration"],
    learningOutcome: "Deepened understanding of memory safety in no_std environments and hardware-software interfacing."
  },
  {
    id: "delivery-management-system", // Requirement 2
    name: "C++ Delivery & Logistics Engine",
    shortDescription: "A logistics application using core data structures to optimize parcel tracking and delivery workflows.",
    fullDescription: "A high-performance system designed to streamline logistics using advanced data structures like Linked Lists for parcel storage and Binary Search Trees for O(log n) searching.",
    techStack: ["C++", "Data Structures", "Algorithms"],
    imageUrl: logisticsImg,
    githubLink: "https://github.com/kene-obiekwe/csc301-projects/tree/main/Data%20Structures%20Project",
    problemSolved: "Optimized logistics management by implementing Priority Queues for delivery scheduling and Stacks for undo/redo functionality.",
    features: ["Priority-based scheduling", "BST search engine", "Undo/Redo via Stacks", "Dynamic parcel management"],
    learningOutcome: "Mastered the practical application of fundamental data structures to solve real-world performance bottlenecks."
  }
];