// src/data/projects.ts
// Showcased projects. Content is based on the resume and each project's README.
// Cards, detail pages and "next project" links are all generated from this list.

import taxyImg from '../assets/projects/taxy.png';
import studyPilotImg from '../assets/projects/studypilot.png';
import nocopoImg from '../assets/projects/nocopo.png';

export interface Highlight {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  /** Short label for tight spaces (the skill map). Falls back to `name`. */
  shortName?: string;
  /** Skills from profile.skills this project uses — must match the skill names exactly. Drives the skill map. */
  uses: string[];
  imageUrl: string;
  liveLink?: string;
  liveLabel?: string;
  githubLink?: string;
  highlights: Highlight[];
  problemSolved: string;
  features: string[];
  learningOutcome: string;
}

export const myProjects: Project[] = [
  {
    id: 'taxy',
    name: 'Taxy',
    tagline: 'Grounded RAG reference tool for Nigerian SME tax law',
    role: 'AI Engineer · RAG, evaluation & deployment',
    shortDescription:
      "A retrieval-augmented system over Nigeria's 2025 tax Acts that answers only from statute text, cites the exact Section and checks every claim against it.",
    fullDescription:
      'Taxy answers small-business tax questions from the Nigeria Tax Act 2025 and the Nigeria Tax Administration Act 2025. It retrieves the relevant statute passages first, answers only from them with Section-level citations, verifies every claim against the passage it cites, declines questions the corpus does not cover, and does tax arithmetic in code rather than in the model.',
    techStack: ['Python', 'PostgreSQL + pgvector', 'OpenAI embeddings', 'LLM API', 'Streamlit', 'Docker', 'Supabase', 'Render', 'pytest'],
    uses: ['Python', 'SQL', 'RAG', 'LLM evaluation', 'LLM API', 'OpenAI embeddings', 'pgvector', 'Streamlit', 'PostgreSQL', 'Supabase', 'Docker', 'Render', 'Git / GitHub'],
    imageUrl: taxyImg,
    liveLink: 'https://taxy-1db6.onrender.com',
    liveLabel: 'Live app',
    githubLink: 'https://github.com/kene-obiekwe/nigeria-tax-copilot',
    highlights: [
      { value: '30/30', label: 'retrieval hit@5 on a held-out test set' },
      { value: '489/489', label: 'shown claims supported by their cited text' },
      { value: '0/40', label: 'must-refuse questions answered' },
      { value: '2,100+', label: 'automated tests' },
    ],
    problemSolved:
      "Small companies in Nigeria have to read long statutes to learn what the new 2025 tax Acts require, and two official texts in circulation differ on provisions that matter, such as the small-company threshold. A plain language model gives no citations and can invent sections — and a wrong answer means a missed deadline or a wrongly claimed exemption.",
    features: [
      'Retrieve-first answers with Section-level citations and a built-in statute reader',
      'A claim verifier that removes anything its cited passage does not support',
      'Declines uncovered questions instead of guessing',
      'Tax arithmetic done by a Decimal calculator with a pinned rate table, not by the model',
      '400 section-aware chunks from the Official Gazette PDFs, including a re-OCR of a 27.7 MB scanned Act',
      'Production hardening: non-root Docker image, row-level security, Google sign-in and per-tier rate limits under a $0.50/day cost cap',
    ],
    learningOutcome:
      'Evaluation has to be decided before the results come in. I fixed the thresholds in advance, ran each held-out test once, and reported the one guardrail gate that fell short (39/40) as not met rather than tuning to the test set.',
  },
  {
    id: 'studypilot',
    name: 'StudyPilot',
    tagline: 'Adaptive study planner with evidence-based recommendations',
    role: 'Full-Stack & Machine Learning Engineer',
    shortDescription:
      'A full-stack study planner that splits weekly hours across courses, forecasts next-week adherence with machine learning and recommends cited study techniques.',
    fullDescription:
      "StudyPilot splits a learner's weekly study hours across their courses, re-plans only the remaining hours when the week changes, and recommends up to four techniques per course from a library of 16 — each with its reason and a cited source. A Random Forest forecasts next-week adherence, and an optional LLM write-up turns the chosen strategies into a short weekly plan.",
    techStack: ['Next.js', 'TypeScript', 'Django REST Framework', 'PostgreSQL', 'scikit-learn', 'LLM API', 'Vercel', 'Render'],
    uses: ['Python', 'TypeScript', 'HTML / CSS', 'scikit-learn', 'LLM API', 'Django REST Framework', 'Next.js', 'React', 'PostgreSQL', 'Neon', 'Render', 'Vercel', 'Git / GitHub'],
    imageUrl: studyPilotImg,
    liveLink: 'https://studypilot-sp.vercel.app',
    liveLabel: 'Live app',
    githubLink: 'https://github.com/kene-obiekwe/studypilot',
    highlights: [
      { value: '1,340+', label: 'automated tests (687 backend, 660 frontend)' },
      { value: '10/10', label: 'valid AI plans, up from 3/10' },
      { value: '1 MB', label: 'forecast model, down from 375 MB' },
      { value: '0', label: 'axe accessibility violations across 14 pages' },
    ],
    problemSolved:
      "Students plan study time by guesswork and rarely get advice tied to how they actually study. StudyPilot closes the loop: it plans the week, logs real sessions with a timer, and adapts the plan and its recommendations from that data.",
    features: [
      'One plan per week that re-splits only the remaining hours when updated mid-week',
      'Study timer, session logging and progress tracking with DST-correct weeks in each user’s time zone',
      'A recommendation engine that diagnoses each course from session length, spacing, trend and exam dates',
      'An optional AI-written plan that must pass a strict number check, at about $0.0007 per plan',
      'Email verification with hashed one-time codes, refresh-token blacklisting, rate limits and Sentry monitoring',
      'A full redesign driven by a usability study with 11 participants (SUS 61.8): guided onboarding and a light/dark design system',
    ],
    learningOutcome:
      "I found that my own model's R² of 0.957 was inflated by a same-week target, and rebuilt it as an honest next-week forecast that beats a 3-week-mean baseline (RMSE 0.380 vs 0.403). A smaller, truthful model is worth more than an impressive number that would not hold up.",
  },
  {
    id: 'nocopo',
    name: 'Nigeria Public Procurement Intelligence',
    tagline: 'SQL analytics & data-quality case study on open contracting data',
    role: 'Data Analyst & Analytics Engineer',
    shortDescription:
      "An audited PostgreSQL analytics build and interactive dashboard over Nigeria's open contracting data, with every published figure reconciled to SQL.",
    fullDescription:
      "A three-layer PostgreSQL analytics database (staging → core → analytics) built from a 210 MB OCDS JSON export of Nigeria's Open Contracting Portal (NOCOPO). It answers seven business questions on supplier concentration, competition, budget against award and procurement timing, published through an 8-page Power BI report and an interactive web dashboard.",
    shortName: 'NOCOPO Dashboard',
    techStack: ['PostgreSQL', 'SQL', 'Python', 'Power BI', 'JavaScript', 'ECharts', 'Vercel', 'OCDS'],
    uses: ['Python', 'SQL', 'JavaScript', 'HTML / CSS', 'PostgreSQL', 'Power BI', 'Vercel', 'Git / GitHub'],
    imageUrl: nocopoImg,
    liveLink: 'https://nocopo-dashboard.vercel.app/',
    liveLabel: 'Live dashboard',
    githubLink: 'https://github.com/kene-obiekwe/nigeria-public-procurement-intelligence',
    highlights: [
      { value: '44%', label: 'of tenders recorded a single bidder' },
      { value: '₦335bn', label: 'of double-counted award value removed' },
      { value: '250+', label: 'automated SQL validation checks' },
      { value: '177', label: 'dashboard figures reconciled to SQL' },
    ],
    problemSolved:
      'NOCOPO publishes procurement records as one large nested JSON file that is hard to analyse and contains quality problems — placeholder dates, implausible bidder counts, incomplete supplier IDs and a portal test entity. Naive totals double-count award value.',
    features: [
      'Collapsed 108,277 releases into 98,866 procurement processes',
      'Logged 21 data-quality issues, with per-metric eligibility rules that flag rather than delete questionable records',
      'A one-command Python pipeline that rebuilds and re-validates the whole project from the raw file in under five minutes',
      'Seven business questions answered with CTEs and window functions',
      'An 8-page Power BI report over a read-only database role',
      'An executive report whose 299 cited figures trace automatically to their source queries',
    ],
    learningOutcome:
      "Audit before you model. Defining each metric's eligible population, and flagging questionable records instead of silently cleaning them away, is what makes every published number defensible.",
  },
];
