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
  description: string;
  url: string;
}

export const profile = {
  firstName: 'Kene',
  lastName: 'Obiekwe',
  role: 'AI Engineer & Data Scientist',
  intro:
    'I build AI and data systems that show their work — grounded RAG tools, machine-learning apps and audited analytics pipelines, shipped to production with the tests to back them.',
  about: [
    "I'm Kene Obiekwe, a computer scientist from Pan-Atlantic University working across AI engineering, full-stack development and data analytics.",
    "I like systems whose answers you can check. Taxy answers Nigerian tax questions only from statute text, with a citation for every claim; StudyPilot plans a learner's week and forecasts how much of it they'll complete; and my procurement analytics build reconciles every published figure back to the SQL that produced it.",
    "I measure before I claim. That has meant fixing evaluation thresholds before running held-out tests, reporting a guardrail that fell short as not met, and rebuilding my own model when I found its headline score was inflated.",
    'As a Digital Risk Consulting intern at EY, I tested IT general controls and supported financial-reporting audit engagements — experience that shapes how I think about access, change management and building systems people can trust.',
  ],
  beyondCode:
    "Off the keyboard, I was vice-captain of PAU's football team (MVP at the Coupe De Escriva) and a member of the university chess club.",
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
      items: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'C / C++', 'Rust', 'HTML / CSS'],
    },
    {
      label: 'AI & Machine Learning',
      items: ['RAG', 'LLM evaluation', 'LLM API', 'OpenAI embeddings', 'pgvector', 'scikit-learn', 'TensorFlow'],
    },
    {
      label: 'Libraries & Frameworks',
      items: ['Pandas', 'NumPy', 'Matplotlib', 'Plotly', 'Django REST Framework', 'Next.js', 'React', 'Streamlit'],
    },
    {
      label: 'Data, Cloud & DevOps',
      items: ['PostgreSQL', 'MySQL', 'Supabase', 'Neon', 'Docker', 'Render', 'Vercel', 'Power BI', 'Git / GitHub'],
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
        "Completed EY's FAIT Immersion modules, earning certificates in audit fundamentals, business understanding and control frameworks.",
      ],
    },
    {
      role: 'IT Support Intern',
      company: 'QualiServe Group',
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
      name: 'AI Engineer for Data Scientists Associate',
      issuer: 'DataCamp',
      description: 'AI-powered solutions and machine learning in Python.',
      url: 'https://www.datacamp.com/certificate/AEDS0014459366596',
    },
    {
      name: 'Data Engineer Associate',
      issuer: 'DataCamp',
      description: 'Building data pipelines in Python and SQL.',
      url: 'https://www.datacamp.com/certificate/DEA0012927968386',
    },
    {
      name: 'SQL Associate',
      issuer: 'DataCamp',
      description: 'Querying and analysing relational data.',
      url: 'https://www.datacamp.com/certificate/SQA0015940104094',
    },
    {
      name: 'GitHub Foundations',
      issuer: 'GitHub',
      description: 'Git, version control and collaboration workflows.',
      url: 'https://learn.microsoft.com/en-us/users/kene-8791/credentials/a9d971bdb8bde1e',
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
