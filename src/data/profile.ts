// src/data/profile.ts
// Personal details shown across the site — edit here, not in the components.
// Content is based on the resume (Resume-Kene Obiekwe.docx).

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export const profile = {
  firstName: 'Kene',
  lastName: 'Obiekwe',
  role: 'Fullstack Developer & Data Scientist',
  intro:
    'I build data-driven software — machine learning models, SQL analytics pipelines and full-stack web apps — and I like understanding how it all works, right down to the bare metal.',
  about: [
    "I'm Kene Obiekwe, a computer scientist from Pan-Atlantic University who works at the intersection of machine learning, data and modern web technologies.",
    "My work spans the full stack and the full data lifecycle: training a Random Forest model that powers StudyPilot AI's study recommendations (R² 0.957), engineering a validated SQL analytics warehouse over 98,000+ Nigerian public procurement processes, and shipping web and desktop apps in React, Next.js, Django and Java. I also enjoy going low-level — like writing an x86_64 kernel in Rust.",
    'As a Digital Risk Consulting intern at EY, I tested IT general controls and supported financial-reporting audit engagements — experience that shapes how I think about access, change management and building systems people can trust.',
  ],
  beyondCode:
    "Off the keyboard, I'm vice-captain of PAU's football team (MVP at the Coupe De Escriva) and a member of the university chess club.",
  education: {
    degree: 'B.Sc. Computer Science',
    school: 'Pan-Atlantic University, Lagos',
    period: '2022 – 2026',
    honours: 'First Class Honours · CGPA 4.62 / 5.00',
    coursework: ['Machine Learning', 'Deep Learning', 'Data Science', 'Data Structures & Algorithms', 'Linear Algebra', 'Statistics'],
  },
  skills: [
    {
      label: 'Languages',
      items: ['Python', 'Java', 'C / C++', 'JavaScript', 'TypeScript', 'Rust', 'SQL', 'HTML / CSS'],
    },
    {
      label: 'Frameworks & Libraries',
      items: ['React', 'Next.js', 'Django', 'NestJS', 'Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'Matplotlib', 'Plotly'],
    },
    {
      label: 'Data & Tools',
      items: ['PostgreSQL', 'MySQL', 'Power BI', 'Docker', 'Git / GitHub', 'Jupyter'],
    },
  ] satisfies SkillGroup[],
  experience: [
    {
      role: 'Digital Risk Consulting Intern',
      company: 'Ernst & Young (EY)',
      location: 'Lagos Island, Lagos',
      period: 'Jul – Sep 2025',
      points: [
        'Conducted IT General Controls (ITGC) testing for client applications across access management, change management and IT operations.',
        'Supported Internal Controls over Financial Reporting (ICFR) engagements by preparing, tracking and reviewing client information requests and evidence.',
        'Evaluated user access controls, segregation of duties, incident management and change management processes on IT audit engagements, working with a team of 8 consultants.',
      ],
    },
    {
      role: 'IT Support Intern',
      company: 'Qualiserve Group',
      location: 'Eti-Osa, Lagos',
      period: 'Jul – Sep 2024',
      points: [
        'Installed operating systems on company machines from external drives.',
        'Automated Windows and Microsoft Office activation with batch scripts.',
        'Configured TP-Link network devices as internet access points.',
      ],
    },
  ] satisfies Experience[],
  certifications: [
    {
      name: 'GitHub Foundations',
      issuer: 'GitHub · Microsoft',
      date: 'Sep 2026 · valid to Sep 2028',
      description: 'Validated foundational knowledge of Git, GitHub repositories, collaboration workflows, version control and GitHub development practices.',
    },
    {
      name: 'SQL Associate',
      issuer: 'DataCamp',
      date: 'Aug 2026',
      description: 'Demonstrated proficiency in SQL for data extraction, transformation, analysis and querying of relational databases through practical, job-relevant assessments.',
    },
    {
      name: 'FAIT Immersion',
      issuer: 'Ernst & Young (EY)',
      date: '2025',
      description: "Certificates in audit fundamentals, business understanding and control frameworks, earned through EY's mandatory FAIT Immersion modules.",
    },
  ] satisfies Certification[],
  contact: {
    email: 'keobiekwe@gmail.com',
    whatsapp: 'https://wa.link/qe1mai',
    github: 'https://github.com/kene-obiekwe',
    linkedin: 'https://www.linkedin.com/in/kene-obiekwe10',
  },
  siteSource: 'https://github.com/kene-obiekwe/portfolio-project',
};
