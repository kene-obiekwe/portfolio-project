import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { myProjects } from './data/projects';
import { useState } from 'react'; 

// --- 1. HOME COMPONENT (Main Page) ---
const Home = () => {
  // States for interactive elements
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  // Function to handle showing projects and scrolling
  const handleViewWork = () => {
    setShowProjects(true);
    // Small timeout to allow the DOM to render the section before scrolling
    setTimeout(() => {
      const element = document.getElementById('projects');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-4">
            Hi, I'm [Your Name]
          </h1>
          <h2 className="text-2xl text-gray-600 mb-6 font-medium">
            Frontend Developer & AI Engineering Student
          </h2>

          {/* About Me Dropdown Section (Requirement 1) */}
          <div className="mb-8 border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm max-w-2xl">
            <button 
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>{isAboutOpen ? "Hide My Story" : "Learn More About Me"}</span>
              <span className={`transform transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out ${isAboutOpen ? 'max-h-96 opacity-100 p-4 border-t' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <p className="text-lg text-gray-600 leading-relaxed">
                I specialize in building intelligent, responsive web applications. 
                Currently focusing on integrating AI models into user-friendly interfaces. 
                My journey as an AI Engineering student drives me to create tools that 
                not only look great but solve complex data problems.
              </p>
            </div>
          </div>
          
          {/* Call to Action Links (Requirement 3) */}
          <div className="flex gap-4 justify-center md:justify-start">
            <div className="relative">
              <button 
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                Get in Touch <span>{isContactOpen ? '▲' : '▼'}</span>
              </button>

              {/* Contact Dropdown Menu */}
              {isContactOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 py-2">
                  <a 
                    href="mailto:keobiekwe@gmail.com" 
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium border-b border-gray-50"
                  >
                    📧 Send Email
                  </a>
                  <a 
                    href="https://wa.link/qe1mai" 
                    target="_blank" 
                    rel="noreferrer"
                    className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors font-medium"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* Toggle Button for Projects Grid */}
            <button 
              onClick={handleViewWork}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all"
            >
              View My Work
            </button>
          </div>
        </div>
        
        {/* Profile Image */}
        <div className="mt-10 md:mt-0 w-64 h-64 bg-blue-100 rounded-full border-8 border-white shadow-2xl overflow-hidden">
          <img src="https://via.placeholder.com/300" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Projects Grid Section - Only shows if showProjects is true (Requirement 2 & 4) */}
      {showProjects && (
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h2 className="text-3xl font-bold mb-12 border-b-4 border-blue-600 w-fit">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {myProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 transition-transform border border-gray-100 flex flex-col">
                <div className="h-48 bg-gray-200">
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.name}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{project.shortDescription}</p>
                  
                  {/* Tech Stack Display */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold text-gray-500 uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interaction Area (Separation of Req 2 and 4) */}
                <div className="p-8 pt-0 mt-auto">
                  {project.id === "ai-content-generator" ? (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest text-center">Dedicated Case Study</div>
                      <Link 
                        to={`/project/${project.id}`} 
                        className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                      >
                        View Full Details →
                      </Link>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-2 border-t border-gray-100 mt-4">
                      <span className="text-xs text-gray-400 font-medium italic">Project Overview</span>
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-blue-500 text-sm font-semibold hover:underline">
                          Source Code
                        </a>
                      )}
                    </div>
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

// --- 2. PROJECT DETAIL COMPONENT (Dedicated Page Requirement) ---
const ProjectDetail = () => {
  const { id } = useParams();
  const project = myProjects.find(p => p.id === id);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Project Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b bg-gray-50 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-blue-600 font-bold flex items-center gap-2">
            <span>←</span> Back to Portfolio
          </Link>
          <div className="flex gap-4">
             {project.githubLink && (
               <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-blue-600">GitHub</a>
             )}
          </div>
        </div>
      </nav>

      <article className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">{project.name}</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map(tech => (
              <span key={tech} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-mono font-bold">{tech}</span>
            ))}
          </div>
          <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-inner border">
             <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">Problem Solved</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{project.problemSolved}</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-4">Learning Outcomes</h2>
              <p className="text-lg text-gray-700 leading-relaxed italic bg-blue-50 p-6 rounded-xl border border-blue-100">
                "{project.learningOutcome}"
              </p>
            </section>
          </div>
          <aside className="space-y-6">
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4">Project Assets</h3>
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="block w-full bg-blue-600 text-center py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors">GitHub Repository</a>
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