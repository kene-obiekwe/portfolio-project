import { Link } from 'react-router-dom';
import profileImg from '../assets/me.jpg';
import { myProjects, type Project } from '../data/projects';
import { profile } from '../data/profile';
import { Chip, Container, Reveal, SectionHeading, WindowFrame } from '../components/ui';
import { btnGhost, btnPrimary } from '../components/styles';
import EmailButton from '../components/EmailButton';
import SkillMap from '../components/SkillMap';

const gradientText = 'bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent';
const cardClass = 'rounded-2xl border border-white/10 bg-ink-900/60 p-5 backdrop-blur-sm';
const cardLabel = 'mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-300';

// --- HERO ---
const Hero = () => (
  <section className="relative pb-20 pt-24 sm:pt-28 md:min-h-[100svh] md:pt-32">
    {/* Violet glow picks up where the intro's screen flash leaves off */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(106,77,169,0.35),transparent_70%)]" />

    {/* Grid: [heading | photo] on top, details below. On md+ the photo spans both rows at the top right. */}
    <Container className="relative grid grid-cols-[1fr_auto] items-end gap-x-4 gap-y-6 md:items-start md:gap-x-16">
      <Reveal className="md:pt-20">
        <p className="mb-6 flex items-center gap-2 font-mono text-sm text-violet-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
          hello, world
        </p>
        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
          I'm {profile.firstName}
          <br />
          <span className={gradientText}>{profile.lastName}.</span>
        </h1>
      </Reveal>

      <Reveal delay={150} className="relative w-24 self-start sm:w-36 md:row-span-2 md:w-60 lg:w-72">
        <div className="absolute -inset-6 rounded-full bg-violet-600/25 blur-3xl" />
        <WindowFrame className="relative">
          {/* Passport-style crop: zoom in from the top so the frame ends at the chest */}
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={profileImg}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="h-full w-full origin-top scale-[1.38] object-cover"
            />
          </div>
        </WindowFrame>
      </Reveal>

      <Reveal delay={100} className="col-span-2 md:col-span-1">
        <p className="font-mono text-base text-slate-200 sm:text-lg">
          <span className="text-violet-400">&gt;</span> {profile.role}
          <span className="caret ml-1 text-violet-300">_</span>
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">{profile.intro}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/#projects" className={btnPrimary}>
            View my work <span aria-hidden>→</span>
          </Link>
          <Link to="/#contact" className={btnGhost}>
            Get in touch
          </Link>
        </div>
      </Reveal>
    </Container>
  </section>
);

// --- ABOUT ---
const About = () => (
  <section id="about" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <SectionHeading index="01" label="about" title="AI and data systems you can check." />
      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="space-y-6 text-lg leading-relaxed text-slate-400 md:col-span-3">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <div className="space-y-5 md:col-span-2">
          <Reveal>
            <div className={cardClass}>
              <h3 className={cardLabel}>Education</h3>
              <p className="font-display text-lg font-bold text-white">{profile.education.degree}</p>
              <p className="text-sm text-slate-400">
                {profile.education.school} · {profile.education.period}
              </p>
              <p className="mt-3 font-mono text-sm text-violet-200">{profile.education.honours}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.education.coursework.map((course) => (
                  <Chip key={course}>{course}</Chip>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className={cardClass}>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-violet-300">Beyond code</h3>
              <p className="text-slate-300">{profile.beyondCode}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Container>
  </section>
);

// --- EXPERIENCE ---
const Experience = () => (
  <section id="experience" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <SectionHeading index="02" label="experience" title="Where I've worked" />
      <div className="relative space-y-14 border-l border-violet-400/20 pl-8 md:ml-4 md:pl-12">
        {profile.experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 100} className="relative">
            {/* Timeline dot, centred on the border line */}
            <span className="absolute -left-[38.5px] top-1 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)] ring-4 ring-ink-950 md:-left-[54.5px]" />
            <p className="font-mono text-xs text-violet-300">{job.period}</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">{job.role}</h3>
            <p className="mt-1 text-slate-400">
              {job.company} · {job.location}
            </p>
            <ul className="mt-5 max-w-3xl space-y-3">
              {job.points.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-slate-300">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

// --- PROJECTS ---
const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <Link
    to={`/project/${project.id}`}
    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/60 p-3 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_30px_60px_-30px_rgba(139,92,246,0.6)]"
  >
    <WindowFrame title={`${project.id}.preview`} className="shadow-none">
      <div className="aspect-video overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="h-full w-full object-cover object-top opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
    </WindowFrame>
    <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
      <p className="mb-2 font-mono text-xs text-violet-400">
        {String(index + 1).padStart(2, '0')} <span className="text-slate-500">· {project.role}</span>
      </p>
      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-violet-200">{project.name}</h3>
      <p className="mb-3 mt-1 text-sm text-violet-200/80">{project.tagline}</p>
      <p className="mb-5 text-sm leading-relaxed text-slate-400">{project.shortDescription}</p>
      <div className="mb-6 grid grid-cols-2 gap-2">
        {project.highlights.slice(0, 2).map((h) => (
          <div key={h.label} className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
            <p className="font-display text-lg font-bold text-white">{h.value}</p>
            <p className="text-[11px] leading-snug text-slate-500">{h.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
      <p className="mt-6 font-mono text-sm text-violet-300">
        View case study <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </div>
  </Link>
);

const Projects = () => (
  <section id="projects" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <SectionHeading index="03" label="projects" title="Selected work" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {myProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 100} className="h-full">
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

// --- TOOLKIT ---
const Toolkit = () => (
  <section id="toolkit" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <SectionHeading index="04" label="toolkit" title="My toolkit, traced to the work." />
      <Reveal>
        <SkillMap />
      </Reveal>
    </Container>
  </section>
);

// --- CERTIFICATIONS ---
const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <circle cx="12" cy="9" r="6" />
    <path d="M9 14.5 7.5 22l4.5-2.5 4.5 2.5L15 14.5M10 9l1.5 1.5L14.5 7.5" />
  </svg>
);

const Certifications = () => (
  <section id="certifications" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <SectionHeading index="05" label="certifications" title="Certifications" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {profile.certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 100} className="h-full">
            <a
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-violet-400/40"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/20 opacity-60 blur-2xl transition-opacity group-hover:opacity-100" />
              <span className="relative mb-5 grid h-12 w-12 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-200">
                <BadgeIcon />
              </span>
              <h3 className="relative font-display text-lg font-bold leading-snug text-white">{cert.name}</h3>
              <p className="relative mt-1 text-sm text-slate-400">{cert.issuer}</p>
              <p className="relative mt-4 flex-1 text-sm leading-relaxed text-slate-300">{cert.description}</p>
              <p className="relative mt-5 font-mono text-xs text-violet-300">
                View credential <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

// --- CONTACT ---
const Contact = () => (
  <section id="contact" className="scroll-mt-24 py-24 md:py-32">
    <Container>
      <Reveal>
        <div className="relative rounded-3xl border border-white/10 bg-ink-900 px-6 py-16 text-center sm:px-12 md:py-24">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_bottom,rgba(106,77,169,0.45),transparent_65%)]" />
          <div className="relative">
            <p className="mb-4 font-mono text-sm text-violet-400">
              <span className="text-violet-300/50">06</span> // contact
            </p>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Let's build something <span className={gradientText}>together.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
              Have a project, a role or an idea in mind? Reach out — I'd love to hear about it.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <EmailButton />
              <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className={btnGhost}>
                LinkedIn
              </a>
              <a href={profile.contact.whatsapp} target="_blank" rel="noreferrer" className={btnGhost}>
                WhatsApp
              </a>
              <a href={profile.contact.github} target="_blank" rel="noreferrer" className={btnGhost}>
                GitHub
              </a>
            </div>
            <p className="mt-8 select-all font-mono text-sm text-slate-500">{profile.contact.email}</p>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

const Home = () => (
  <main>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Toolkit />
    <Certifications />
    <Contact />
  </main>
);

export default Home;
