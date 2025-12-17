import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { myProjects } from './data/projects';
import { useState } from 'react'; 
import profileImg from './assets/me.jpg'; 

// --- 1. HOME COMPONENT (Main Page) ---
const Home = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const handleViewWork = () => {
    setShowProjects(true);
    setTimeout(() => {
      const element = document.getElementById('projects');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-blue-500/30">
      
      {/* Professional Nav Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
              K's
            </div>
            <span className="text-lg font-bold tracking-tight text-white uppercase">Portfolio</span>
          </div>
          
          <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-slate-400">
            <button onClick={handleViewWork} className="hover:text-blue-400 transition-colors">Projects</button>
            
            {/* Requirement 4: Contact Me Dropdown in Nav */}
            <div className="relative">
              <button 
                onClick={() => setIsContactOpen(!isContactOpen)} 
                className={`px-5 py-2 rounded-full border transition-all flex items-center gap-2 ${
                  isContactOpen 
                  ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                  : "bg-slate-800 border-slate-700 text-white hover:border-blue-500"
                }`}
              >
                Contact Me <span>{isContactOpen ? '▲' : '▼'}</span>
              </button>

              {isContactOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in-95">
                  <a href="mailto:keobiekwe@gmail.com" className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border-b border-slate-700/50">📧 Email</a>
                  <a href="https://wa.link/qe1mai" target="_blank" rel="noreferrer" className="block px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">💬 WhatsApp</a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-2/3 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Building the <span className="text-blue-500">Future</span> with Code & Data.
          </h1>
          <h2 className="text-2xl text-slate-400 mb-10 font-medium">
            Fullstack Developer & Data Scientist 
          </h2>

          {/* About Me Dropdown Section */}
          <div className="mb-10 border border-slate-700/50 rounded-2xl bg-slate-800/40 backdrop-blur-md overflow-hidden shadow-2xl max-w-2xl">
            <button 
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-200 hover:bg-slate-700/30 transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {isAboutOpen ? "Close" : "About Me"}
              </span>
              <span className={`transform transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out ${isAboutOpen ? 'max-h-[1000px] opacity-100 p-8 border-t border-slate-700/50' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="text-lg text-slate-400 leading-relaxed space-y-6">
                <p>
                  I am <strong className="text-white">Kene Obiekwe</strong>, a multifaceted developer dedicated to building high-performance applications. I specialize in the intersection of <strong>Machine Learning</strong> and <strong>Modern Web Technologies</strong>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <h3 className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">Core Development</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Fullstack Web Architecture
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Scalable Backend Systems
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">Data Science & AI</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Deep Learning (DL) Models
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Machine Learning (ML) Pipelines
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Image - Straight and Framed */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl border border-slate-700 bg-slate-800 shadow-[0_0_50px_rgba(37,99,235,0.1)] overflow-hidden transition-all duration-500 hover:shadow-blue-500/20">
          <img 
            src={profileImg} 
            alt="Kene Obiekwe" 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
          />
        </div>
      </section>

      {/* Projects Grid Section */}
      {showProjects && (
        <section id="projects" className="max-w-6xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">Featured Work</h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-blue-600 via-blue-400 to-transparent shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {myProjects.map((project) => (
              <div key={project.id} className="group bg-slate-800/20 border border-slate-700/50 rounded-3xl shadow-xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col">
                <div className="h-52 bg-slate-900 relative overflow-hidden">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                </div>
                
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{project.name}</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed line-clamp-3">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-md font-bold text-blue-400 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  {/* logic to only show details for 1 project */}
                  {project.id === "ai-content-generator" ? (
                    <Link 
                      to={`/project/${project.id}`} 
                      className="block w-full text-center bg-blue-600 border border-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all"
                    >
                      View Project Details
                    </Link>
                  ) : (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full text-center bg-slate-800 border border-slate-700 text-white py-3.5 rounded-xl font-bold hover:bg-slate-700 transition-all"
                    >
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

// --- 2. PROJECT DETAIL COMPONENT ---
const ProjectDetail = () => {
  const { id } = useParams();
  const project = myProjects.find(p => p.id === id);

  if (!project) return <div className="min-h-screen bg-[#0f172a] text-white p-20 text-center">Project Not Found</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md py-5 px-6 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-sm">
          <Link to="/" className="text-blue-500 font-bold flex items-center gap-2 hover:text-blue-400 transition-colors uppercase tracking-widest">
            <span>←</span> Back to Home
          </Link>
          <span className="font-bold text-slate-500 uppercase tracking-widest">Project Detail</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">{project.name}</h1>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800 mb-12">
             <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map(tech => (
              <span key={tech} className="bg-slate-800 border border-slate-700 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-16">
            <section>
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                The Core Problem
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">{project.problemSolved}</p>
            </section>
            
            <section className="bg-slate-800/30 border border-slate-700/50 p-10 rounded-3xl shadow-inner">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Key Insights</h2>
              <p className="text-lg text-slate-300 leading-relaxed italic">
                "{project.learningOutcome}"
              </p>
            </section>
          </div>
          
          <aside>
            <div className="bg-blue-600 p-8 rounded-3xl shadow-[0_0_30px_rgba(37,99,235,0.2)] sticky top-32">
              <h3 className="text-lg font-bold text-white mb-6 text-center">Interested in the logic?</h3>
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="block w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                Source Code
              </a>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

// --- 3. MAIN APP ROUTER ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;