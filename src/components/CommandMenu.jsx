import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, FiHome, FiUser, FiCode, FiFolder, FiAward, FiMail, 
  FiDownload, FiCopy, FiSun, FiMoon, FiVolume2, FiVolumeX,
  FiExternalLink, FiCornerDownLeft, FiX, FiGithub, FiLinkedin
} from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { scrollToSection } from '../utils/scrollHelper'
import resumePdf from '../assets/younus_resume[22cs052].pdf'
import { soundFx } from '../utils/SoundEffects'
import './CommandMenu.css'

export default function CommandMenu({ isOpen, onClose, theme, toggleTheme, soundEnabled, toggleSound, showToast }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const actions = [
    // Navigation
    { id: 'nav-hero', category: 'Navigation', icon: <FiHome />, title: 'Jump to Home / Hero', shortcut: 'G H', run: () => scrollTo('hero') },
    { id: 'nav-about', category: 'Navigation', icon: <FiUser />, title: 'Jump to About Me', shortcut: 'G A', run: () => scrollTo('about') },
    { id: 'nav-skills', category: 'Navigation', icon: <FiCode />, title: 'Jump to Technical Skills', shortcut: 'G S', run: () => scrollTo('skills') },
    { id: 'nav-projects', category: 'Navigation', icon: <FiFolder />, title: 'Jump to Projects', shortcut: 'G P', run: () => scrollTo('projects') },
    { id: 'nav-exp', category: 'Navigation', icon: <FiAward />, title: 'Jump to Experience & Education', shortcut: 'G E', run: () => scrollTo('experience') },
    { id: 'nav-contact', category: 'Navigation', icon: <FiMail />, title: 'Jump to Contact', shortcut: 'G C', run: () => scrollTo('contact') },

    // Quick Actions
    { 
      id: 'act-resume', 
      category: 'Actions', 
      icon: <FiDownload />, 
      title: 'Download Resume (PDF)', 
      shortcut: '↵', 
      run: () => {
        window.open(resumePdf, '_blank')
        showToast('Opening Resume...')
      } 
    },
    { 
      id: 'act-copy-email', 
      category: 'Actions', 
      icon: <FiCopy />, 
      title: 'Copy Email Address to Clipboard', 
      shortcut: '↵', 
      run: () => {
        navigator.clipboard.writeText('younustheman@gmail.com')
        showToast('Copied email to clipboard!')
      } 
    },
    { 
      id: 'act-toggle-theme', 
      category: 'Actions', 
      icon: theme === 'dark' ? <FiSun /> : <FiMoon />, 
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, 
      shortcut: '↵', 
      run: () => {
        toggleTheme()
        showToast(`Switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`)
      } 
    },
    { 
      id: 'act-toggle-sound', 
      category: 'Actions', 
      icon: soundEnabled ? <FiVolumeX /> : <FiVolume2 />, 
      title: `${soundEnabled ? 'Disable' : 'Enable'} Interface Audio FX`, 
      shortcut: '↵', 
      run: () => {
        toggleSound()
      } 
    },

    // External Profiles
    { 
      id: 'soc-github', 
      category: 'Profiles', 
      icon: <FiGithub />, 
      title: 'GitHub: Younus00007', 
      shortcut: '↗', 
      run: () => window.open('https://github.com/Younus00007', '_blank') 
    },
    { 
      id: 'soc-linkedin', 
      category: 'Profiles', 
      icon: <FiLinkedin />, 
      title: 'LinkedIn: in/younuscse', 
      shortcut: '↗', 
      run: () => window.open('https://www.linkedin.com/in/younuscse/', '_blank') 
    },
    { 
      id: 'soc-leetcode', 
      category: 'Profiles', 
      icon: <SiLeetcode />, 
      title: 'LeetCode: Younus07 (600+ Solved)', 
      shortcut: '↗', 
      run: () => window.open('https://leetcode.com/u/Younus07/', '_blank') 
    },
  ]

  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  )

  const scrollTo = (id) => {
    scrollToSection(id, -70)
  }

  useEffect(() => {
    if (isOpen) {
      soundFx.playChime()
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      soundFx.playHover()
      setSelectedIndex(prev => (prev + 1) % filteredActions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      soundFx.playHover()
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredActions[selectedIndex]) {
        soundFx.playClick()
        filteredActions[selectedIndex].run()
        onClose()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="cmd-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="cmd-palette glass-card"
            initial={{ scale: 0.94, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="cmd-input-wrapper">
              <FiSearch className="cmd-search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="Type a command or search sections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {query && (
                <button className="cmd-clear" onClick={() => setQuery('')}>
                  <FiX />
                </button>
              )}
              <span className="cmd-esc-badge" onClick={onClose}>ESC</span>
            </div>

            {/* Command Results */}
            <div className="cmd-results">
              {filteredActions.length === 0 ? (
                <div className="cmd-empty">
                  <p>No results found for "{query}"</p>
                  <span>Try searching for 'resume', 'projects', 'email', or 'skills'</span>
                </div>
              ) : (
                filteredActions.map((action, idx) => {
                  const isSelected = idx === selectedIndex
                  return (
                    <div
                      key={action.id}
                      className={`cmd-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        soundFx.playClick()
                        action.run()
                        onClose()
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="cmd-item-left">
                        <span className="cmd-item-icon">{action.icon}</span>
                        <span className="cmd-item-title">{action.title}</span>
                      </div>
                      <div className="cmd-item-right">
                        <span className="cmd-item-category">{action.category}</span>
                        {action.shortcut && (
                          <span className="cmd-item-shortcut">{action.shortcut}</span>
                        )}
                        {isSelected && <FiCornerDownLeft className="cmd-enter-icon" />}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="cmd-footer">
              <div className="cmd-hints">
                <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                <span><kbd>↵</kbd> select</span>
                <span><kbd>esc</kbd> close</span>
              </div>
              <div className="cmd-brand">
                <span className="gradient-text">Alex Neon Engine</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
