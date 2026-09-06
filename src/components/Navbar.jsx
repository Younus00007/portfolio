import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSun, FiMoon, FiMenu, FiX, FiSearch, FiVolume2, FiVolumeX, FiFileText, FiDownload
} from 'react-icons/fi'
import { ScrollLink, scrollToSection } from '../utils/scrollHelper'
import resumePdf from '../assets/younus_resume[22cs052].pdf'
import { soundFx } from '../utils/SoundEffects'
import './Navbar.css'

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Journey', to: 'experience' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar({ theme, toggleTheme, soundEnabled, toggleSound, openCmd }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Active section detector
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="navbar-container">
        {/* Brand Logo */}
        <ScrollLink 
          to="hero" 
          offset={-70}
          className="navbar-logo" 
          onClick={() => soundFx.playClick()}
          data-cursor
        >
          <div className="logo-badge">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">MY</span>
            <span className="logo-bracket">/&gt;</span>
          </div>
          <span className="logo-sub">Younus.dev</span>
        </ScrollLink>

        {/* Desktop Navigation Links with animated indicator */}
        <div className="navbar-links-pill">
          {navLinks.map(({ label, to }) => {
            const isActive = activeSection === to
            return (
              <ScrollLink
                key={to}
                to={to}
                offset={-70}
                onClick={() => {
                  soundFx.playClick()
                  setActiveSection(to)
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`nav-link ${isActive ? 'active' : ''}`}
                data-cursor
              >
                {label}
                {isActive && (
                  <motion.div
                    className="nav-active-indicator"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </ScrollLink>
            )
          })}
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Quick Search / Command Palette (Ctrl+K) */}
          <button 
            className="action-btn cmd-trigger"
            onClick={() => {
              soundFx.playClick()
              openCmd()
            }}
            title="Search & Commands (Ctrl+K)"
            data-cursor
          >
            <FiSearch size={15} />
            <span className="cmd-hotkey">⌘K</span>
          </button>

          {/* Sound Toggle */}
          <button 
            className={`action-btn ${soundEnabled ? 'active' : ''}`}
            onClick={() => {
              toggleSound()
            }}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            data-cursor
          >
            {soundEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
          </button>

          {/* Theme Toggle */}
          <button 
            className="action-btn theme-toggle" 
            onClick={() => {
              soundFx.playClick()
              toggleTheme()
            }} 
            title="Toggle theme"
            data-cursor
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Resume CTA */}
          <a
            href={resumePdf}
            className="btn-glow nav-resume-btn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            data-cursor
          >
            <FiFileText size={14} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="action-btn mobile-menu-toggle" 
            onClick={() => {
              soundFx.playClick()
              setMobileOpen(!mobileOpen)
            }}
            aria-label="Toggle navigation menu"
            data-cursor
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="mobile-drawer-inner">
              <ul className="mobile-links">
                {navLinks.map(({ label, to }, i) => (
                  <motion.li 
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={`#${to}`}
                      onClick={(e) => {
                        e.preventDefault()
                        soundFx.playClick()
                        setMobileOpen(false)
                        scrollToSection(to, -70)
                      }}
                      className="mobile-link"
                    >
                      <span>{label}</span>
                      <span className="mobile-link-arrow">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-drawer-footer">
                <button
                  className="mobile-cmd-btn"
                  onClick={() => {
                    setMobileOpen(false)
                    openCmd()
                  }}
                >
                  <FiSearch /> Open Command Palette (Ctrl+K)
                </button>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow mobile-resume-btn"
                >
                  <FiDownload /> Download Resume (PDF)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
