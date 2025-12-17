// src/App.tsx

function App() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero / About Me Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center md:text-left md:flex-row md:justify-between">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-blue-600 mb-4">
            Hi, I'm [Your Name]
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-6">
            Frontend Developer & AI Engineering Student
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            I specialize in building responsive, production-ready web applications. 
            My technical focus is on creating clean user interfaces with React and 
            exploring the intersection of AI and frontend development.
          </p>
          
          {/* CTA - Required for 10% of grade */}
          <div className="flex gap-4 justify-center md:justify-start">
            <a 
              href="mailto:your-email@example.com" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </a>
            <a 
              href="#projects" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>

        {/* Optional: Placeholder for your image */}
        <div className="mt-12 md:mt-0 md:w-1/3 flex justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-blue-100 rounded-full border-4 border-white shadow-xl overflow-hidden">
             <img 
               src="https://via.placeholder.com/300" 
               alt="Your Profile" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;