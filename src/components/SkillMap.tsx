import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { myProjects } from '../data/projects';
import { profile } from '../data/profile';

// Skill constellation: every skill is a star; hovering (or tapping / focusing) one draws
// lines to the projects that use it, and hovering a project lights up its whole stack.
// Links come from `uses` in data/projects.ts.

const ACCENTS = ['#a78bfa', '#f0abfc', '#7dd3fc']; // violet, fuchsia, sky — one per project

type Target = { kind: 'skill'; name: string } | { kind: 'project'; id: string } | null;
interface Line {
  key: string;
  d: string;
  color: string;
}

const projectsUsing = (skill: string) => myProjects.filter((p) => p.uses.includes(skill));
const accentOf = (id: string) => ACCENTS[myProjects.findIndex((p) => p.id === id) % ACCENTS.length];
const labelOf = (id: string) => {
  const p = myProjects.find((x) => x.id === id);
  return p?.shortName ?? p?.name ?? id;
};
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SkillMap = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const skillEls = useRef(new Map<string, HTMLElement>());
  const orbEls = useRef(new Map<string, HTMLElement>());
  const activeRef = useRef<Target>(null);
  const resumeTimer = useRef<number | undefined>(undefined);

  const [active, setActive] = useState<Target>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [auto, setAuto] = useState(true); // slow demo loop until the visitor interacts
  const [inView, setInView] = useState(false);
  const [reduced] = useState(prefersReducedMotion);

  // Curves from the top of each skill pill to its project's orb, in the wrapper's coordinates.
  const measure = useCallback((target: Target): Line[] => {
    const wrap = wrapRef.current;
    if (!wrap || !target) return [];
    const box = wrap.getBoundingClientRect();
    const pairs: [string, string][] =
      target.kind === 'skill'
        ? projectsUsing(target.name).map((p) => [target.name, p.id])
        : (myProjects.find((p) => p.id === target.id)?.uses ?? []).map((s) => [s, target.id]);

    return pairs.flatMap(([skill, id]) => {
      const s = skillEls.current.get(skill);
      const o = orbEls.current.get(id);
      if (!s || !o) return [];
      const sr = s.getBoundingClientRect();
      const or = o.getBoundingClientRect();
      const x1 = sr.left + sr.width / 2 - box.left;
      const y1 = sr.top - box.top;
      const x2 = or.left + or.width / 2 - box.left;
      const y2 = or.top + or.height / 2 - box.top;
      const mid = (y1 + y2) / 2;
      return [{ key: `${skill}->${id}`, d: `M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`, color: accentOf(id) }];
    });
  }, []);

  const show = useCallback(
    (target: Target) => {
      activeRef.current = target;
      setActive(target);
      setLines(measure(target));
    },
    [measure],
  );

  const engage = (target: Target) => {
    window.clearTimeout(resumeTimer.current);
    setAuto(false);
    show(target);
  };
  const release = () => {
    show(null);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setAuto(true), 6000);
  };

  // Only run the demo loop while the map is on screen
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || reduced) return;
    let i = 0;
    const tick = () => show({ kind: 'project', id: myProjects[i++ % myProjects.length].id });
    const first = window.setTimeout(tick, 700);
    const loop = window.setInterval(tick, 3200);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
    };
  }, [auto, inView, reduced, show]);

  // Keep the lines attached when the layout changes size
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => setLines(measure(activeRef.current)));
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  const activeProject = active?.kind === 'project' ? myProjects.find((p) => p.id === active.id) : undefined;
  const litSkills = active?.kind === 'skill' ? new Set([active.name]) : activeProject ? new Set(activeProject.uses) : null;
  const litProjects =
    active?.kind === 'project'
      ? new Set([active.id])
      : active?.kind === 'skill'
        ? new Set(projectsUsing(active.name).map((p) => p.id))
        : null;
  const activeKey = active ? `${active.kind}:${active.kind === 'skill' ? active.name : active.id}` : 'none';

  // Status line: "> pgvector → Taxy"
  const status = (() => {
    if (!active)
      return <span className="text-slate-400">hover or tap a skill to trace it to the projects that use it</span>;
    if (active.kind === 'project') {
      return (
        <>
          <span style={{ color: accentOf(active.id) }}>{labelOf(active.id)}</span>
          <span className="text-slate-400"> uses </span>
          <span className="text-white">{activeProject?.uses.length} of these</span>
        </>
      );
    }
    const users = projectsUsing(active.name);
    return (
      <>
        <span className="text-white">{active.name}</span>
        <span className="text-slate-400"> → </span>
        {users.length ? (
          users.map((p, i) => (
            <span key={p.id}>
              {i > 0 && <span className="text-slate-400">, </span>}
              <span style={{ color: accentOf(p.id) }}>{labelOf(p.id)}</span>
            </span>
          ))
        ) : (
          <span className="text-slate-300">coursework &amp; earlier projects</span>
        )}
      </>
    );
  })();

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerLeave={(e) => e.pointerType === 'mouse' && release()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) release();
      }}
    >
      {/* Connection lines sit behind the nodes, so they appear to plug into each pill */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {lines.map((l) => (
          <g key={`${activeKey}|${l.key}`}>
            <path d={l.d} pathLength={1} fill="none" stroke={l.color} strokeOpacity={0.18} strokeWidth={6} className="skill-line" />
            <path d={l.d} pathLength={1} fill="none" stroke={l.color} strokeOpacity={0.9} strokeWidth={1.25} className="skill-line" />
            {!reduced && (
              <circle r={2.5} fill={l.color}>
                <animateMotion dur="2.6s" repeatCount="indefinite" path={l.d} />
              </circle>
            )}
          </g>
        ))}
      </svg>

      <p
        aria-live={auto ? 'off' : 'polite'}
        className="relative z-10 mb-8 min-h-[1.5rem] text-center font-mono text-xs sm:text-sm"
      >
        <span className="text-violet-400">&gt; </span>
        {status}
      </p>

      {/* Projects: the "planets" the skills connect to */}
      <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:gap-6">
        {myProjects.map((p, i) => {
          const color = accentOf(p.id);
          const lit = litProjects?.has(p.id);
          const dim = litProjects && !lit;
          return (
            <Link
              key={p.id}
              to={`/project/${p.id}`}
              onPointerEnter={(e) => e.pointerType === 'mouse' && engage({ kind: 'project', id: p.id })}
              onFocus={() => engage({ kind: 'project', id: p.id })}
              className={`relative flex flex-col items-center rounded-2xl border bg-ink-900/80 px-2 pb-6 pt-4 text-center backdrop-blur-sm transition-all duration-300 sm:px-4 ${
                dim ? 'opacity-40' : ''
              }`}
              style={{
                borderColor: lit ? `${color}99` : 'rgba(255,255,255,0.1)',
                boxShadow: lit ? `0 0 40px -12px ${color}` : undefined,
              }}
            >
              <span className="font-mono text-[10px] text-slate-400 sm:text-xs">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-1 font-display text-sm font-bold leading-tight text-white sm:text-lg">
                {p.shortName ?? p.name}
              </span>
              <span className="mt-1 hidden font-mono text-[11px] text-slate-400 sm:block">{p.uses.length} tools</span>
              <span
                ref={(el) => {
                  if (el) orbEls.current.set(p.id, el);
                  else orbEls.current.delete(p.id);
                }}
                className="absolute -bottom-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full transition-shadow duration-300"
                style={{
                  background: color,
                  boxShadow: lit ? `0 0 0 5px ${color}33, 0 0 22px ${color}` : `0 0 0 4px ${color}1a, 0 0 10px ${color}88`,
                }}
              />
            </Link>
          );
        })}
      </div>

      {/* Skills, grouped into constellations */}
      <div className="relative z-10 mt-16 grid gap-x-6 gap-y-10 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
        {profile.skills.map((group) => (
          <div key={group.label}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-300 [text-shadow:0_0_6px_#07050f,0_0_3px_#07050f,0_0_12px_#07050f]">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((name) => {
                const users = projectsUsing(name);
                const lit = litSkills?.has(name);
                const dim = litSkills && !lit;
                return (
                  <button
                    key={name}
                    type="button"
                    ref={(el) => {
                      if (el) skillEls.current.set(name, el);
                      else skillEls.current.delete(name);
                    }}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && engage({ kind: 'skill', name })}
                    onFocus={() => engage({ kind: 'skill', name })}
                    onClick={() => engage({ kind: 'skill', name })}
                    className={`inline-flex cursor-default items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                      lit
                        ? 'border-violet-300/60 bg-violet-500/25 text-white shadow-[0_0_22px_-6px_rgba(167,139,250,0.9)]'
                        : 'border-white/10 bg-ink-900/90 text-slate-300'
                    } ${dim ? 'opacity-35' : ''}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        lit ? 'bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]' : 'skill-star bg-violet-300/70'
                      }`}
                    />
                    {name}
                    {users.length > 0 && (
                      <span className="flex gap-0.5" aria-label={`used in ${users.map((u) => labelOf(u.id)).join(', ')}`}>
                        {users.map((u) => (
                          <span key={u.id} className="h-1 w-1 rounded-full" style={{ background: accentOf(u.id) }} />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMap;
