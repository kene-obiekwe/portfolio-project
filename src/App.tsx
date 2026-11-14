import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Intro from './components/Intro';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Backdrop from './components/Backdrop';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

// Intro plays once per browser session on the home page; add ?intro to the URL to force it.
// The Leave button brings it back in 'return' mode (zooming out of the monitor).
const INTRO_SEEN_KEY = 'introSeen';

type IntroMode = 'enter' | 'return' | null;

const shouldShowIntro = () => {
  if (window.location.pathname !== '/') return false;
  if (new URLSearchParams(window.location.search).has('intro')) return true;
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) !== '1';
  } catch {
    return true;
  }
};

const Shell = () => {
  const navigate = useNavigate();
  const [intro, setIntro] = useState<IntroMode>(() => (shouldShowIntro() ? 'enter' : null));

  const handleIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // Storage unavailable (private mode etc.) - the intro just plays again next time
    }
    setIntro(null);
  }, []);

  const leave = useCallback(() => setIntro('return'), []);
  // Behind the violet cover, reset to the top of the home page for the next entry
  const handleCovered = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      {intro && (
        <Intro key={intro} returning={intro === 'return'} onDone={handleIntroDone} onCovered={handleCovered} />
      )}
      <ScrollManager />

      <div className="relative isolate min-h-screen overflow-x-clip bg-ink-950 font-sans text-slate-300">
        <Backdrop />
        <Nav onLeave={leave} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
        <Footer onLeave={leave} />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}

export default App;
