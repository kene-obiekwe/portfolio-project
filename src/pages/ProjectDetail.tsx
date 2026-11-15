import { Link, useParams } from 'react-router-dom';
import { myProjects } from '../data/projects';
import { Chip, Container, Reveal, WindowFrame } from '../components/ui';
import { btnGhost, btnPrimary, glass } from '../components/styles';

const BackLink = () => (
  <Link to="/#projects" className="font-mono text-sm text-slate-300 transition-colors hover:text-violet-300">
    ← back to projects
  </Link>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const index = myProjects.findIndex((p) => p.id === id);
  const project = myProjects[index];

  if (!project) {
    return (
      <main className="flex min-h-[80vh] items-center pt-28">
        <Container className="text-center">
          <p className="mb-4 font-mono text-sm text-violet-400">404 // not found</p>
          <h1 className="mb-8 font-display text-4xl font-bold text-white">That project doesn't exist.</h1>
          <BackLink />
        </Container>
      </main>
    );
  }

  const next = myProjects[(index + 1) % myProjects.length];

  return (
    <main className="relative pb-24 pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(106,77,169,0.3),transparent_70%)]" />

      <Container className="relative max-w-5xl">
        <BackLink />

        <Reveal className="mt-10">
          <p className="mb-4 font-mono text-sm text-violet-400">
            <span className="text-violet-300/50">{String(index + 1).padStart(2, '0')}</span> // {project.role}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-3 text-lg text-violet-200/80 sm:text-xl">{project.tagline}</p>
          <p className="legible mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 sm:text-xl">{project.fullDescription}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className={btnPrimary}>
                {project.liveLabel ?? 'Live demo'} ↗
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className={btnGhost}>
                View source code
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <WindowFrame title={project.liveLink?.replace(/^https?:\/\//, '').replace(/\/$/, '') ?? `${project.id}.preview`}>
            <img src={project.imageUrl} alt={`${project.name} screenshot`} className="w-full" />
          </WindowFrame>
        </Reveal>

        {/* Headline numbers */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 80}>
              <div className={`${glass} h-full p-5`}>
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">{h.value}</p>
                <p className="mt-2 text-sm leading-snug text-slate-300">{h.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div className={`${glass} space-y-10 self-start p-6 sm:p-8 md:col-span-2`}>
            <Reveal>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-300">The problem</h2>
              <p className="text-lg leading-relaxed text-slate-200">{project.problemSolved}</p>
            </Reveal>
            <Reveal>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-300">What I learned</h2>
              <p className="border-l-2 border-violet-500/60 pl-5 text-lg italic leading-relaxed text-slate-200">
                {project.learningOutcome}
              </p>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <aside className={`${glass} p-6 md:sticky md:top-28`}>
              <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-violet-300">Key features</h2>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-slate-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>

        {next.id !== project.id && (
          <Link
            to={`/project/${next.id}`}
            className={`${glass} group mt-24 flex items-center justify-between gap-6 p-6 transition-colors hover:border-violet-400/40 sm:p-8`}
          >
            <div>
              <p className="mb-2 font-mono text-xs text-slate-400">next project</p>
              <p className="font-display text-xl font-bold text-white transition-colors group-hover:text-violet-200 sm:text-2xl">
                {next.name}
              </p>
            </div>
            <span className="font-mono text-2xl text-violet-300 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </Container>
    </main>
  );
};

export default ProjectDetail;
