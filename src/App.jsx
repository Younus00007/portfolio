import { useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-content">
          <div className="loader-logo">MY</div>
          <div className="loader-bar"><div className="loader-progress" /></div>
          <p className="loader-text">Initializing Experience...</p>
        </div>
      </div>
    )
  }

  return (
    <HelmetProvider>
      <div className="app" data-theme={theme}>
        <div className="noise-overlay" />
        <CustomCursor />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
