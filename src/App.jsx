import { useState, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandMenu from './components/CommandMenu'
import { soundFx } from './utils/SoundEffects'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(true)
  const [loadPercent, setLoadPercent] = useState(0)
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Top scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Sound effects toggle
  const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    soundFx.setEnabled(newState)
    if (newState) {
      soundFx.playChime()
      showToast('Sound Effects Enabled 🔊')
    } else {
      showToast('Sound Effects Muted 🔇')
    }
  }

  // Toast notification helper
  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(prev => prev === message ? '' : prev)
    }, 3000)
  }

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCmdOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Cinematic initial loader
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 300)
          return 100
        }
        return prev + Math.floor(Math.random() * 15 + 8)
      })
    }, 70)

    return () => clearInterval(interval)
  }, [])

  return (
    <HelmetProvider>
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            className="loader-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="loader-content">
              <div className="loader-badge-ring">
                <div className="loader-logo-text">MY</div>
              </div>
              <div className="loader-bar-wrapper">
                <div 
                  className="loader-bar-fill" 
                  style={{ width: `${Math.min(loadPercent, 100)}%` }} 
                />
              </div>
              <div className="loader-info">
                <span className="loader-status">INITIALIZING SYSTEM ARCHITECTURE...</span>
                <span className="loader-pct">{Math.min(loadPercent, 100)}%</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="app" data-theme={theme}>
        {/* Film grain noise texture */}
        <div className="noise-overlay" />

        {/* Global Scroll Progress */}
        <motion.div className="scroll-progress-bar" style={{ scaleX }} />

        {/* Interactive Custom Cursor */}
        <CustomCursor />

        {/* Command Palette (Ctrl+K) */}
        <CommandMenu
          isOpen={isCmdOpen}
          onClose={() => setIsCmdOpen(false)}
          theme={theme}
          toggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          showToast={showToast}
        />

        {/* Global Toast Pill Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="global-toast-pill glass-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <span className="toast-dot" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Navbar */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          openCmd={() => setIsCmdOpen(true)}
        />

        {/* Main Content Sections */}
        <main>
          <Hero openCmd={() => setIsCmdOpen(true)} />
          <About showToast={showToast} />
          <Skills />
          <Projects />
          <Experience />
          <Contact showToast={showToast} />
        </main>

        {/* Modern Footer */}
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
