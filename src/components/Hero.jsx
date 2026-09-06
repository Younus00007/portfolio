import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FiArrowDown, FiGithub, FiLinkedin, FiMail, FiCode, 
  FiCheckCircle, FiTerminal, FiExternalLink 
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import { SiLeetcode, SiSpringboot, SiReact, SiPython, SiDocker, SiPostgresql } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import ThreeBackground from './ThreeBackground'
import AnimatedCounter from './AnimatedCounter'
import TypewriterText from './TypewriterText'
import { ScrollLink } from '../utils/scrollHelper'
import { soundFx } from '../utils/SoundEffects'
import './Hero.css'

export default function Hero({ openCmd }) {
  // Live India Standard Time (IST)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST'
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const orbitTech = [
    { icon: <FaJava color="#ea580c" />, label: 'Java', delay: 0 },
    { icon: <SiSpringboot color="#10b981" />, label: 'Spring Boot', delay: 0.2 },
    { icon: <SiPython color="#3b82f6" />, label: 'Python', delay: 0.4 },
    { icon: <SiReact color="#06b6d4" />, label: 'React', delay: 0.6 },
    { icon: <SiDocker color="#0284c7" />, label: 'Docker', delay: 0.8 },
    { icon: <SiPostgresql color="#336791" />, label: 'PostgreSQL', delay: 1.0 },
  ]

  const stats = [
    { number: 600, suffix: '+', label: 'LeetCode Solved', desc: 'Algorithms & DS' },
    { number: 10, suffix: '+', label: 'Projects Built', desc: 'Full-Stack & ML' },
    { number: 100, suffix: '%', label: 'Clean Code', desc: 'Scalable & Tested' },
    { number: 2, suffix: 'nd', label: 'Hackathon Prize', desc: 'Garuda GenAI' },
  ]

  const typeStrings = [
    'scalable backend architectures.',
    'intelligent GenAI systems & agents.',
    'pixel-perfect responsive web apps.',
    'algorithmic high-performance solutions.'
  ]

  return (
    <section id="hero" className="hero-section">
      {/* 3D Celestial Constellation Background */}
      <ThreeBackground />

      {/* Aurora Gradient Glow Mesh */}
      <div className="hero-aurora-container">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Main Hero Narrative */}
          <div className="hero-main">
            {/* Top Status & Live Clock Bar */}
            <motion.div
              className="hero-status-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="status-badge glass-card" data-cursor>
                <span className="beacon-dot" />
                <span className="status-text">Available for Opportunities</span>
              </div>
              <div className="time-badge glass-card" data-tooltip="Local Time (India)">
                <span className="time-indicator">🕒</span>
                <span className="time-text">{time || 'Loading IST...'}</span>
              </div>
            </motion.div>

            {/* Headline with Luxury Typography */}
            <motion.div
              className="hero-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <span className="hero-greeting">Hi there, I'm</span>
              <h1 className="hero-name">
                <span className="shimmer-text">Muhammad Younus A</span>
              </h1>
            </motion.div>

            {/* Dynamic Typewriter */}
            <motion.div
              className="hero-typewriter-wrapper"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="type-prefix">I engineer </span>
              <TypewriterText strings={typeStrings} speed={60} deleteSpeed={35} pause={2000} />
            </motion.div>

            {/* Brief Bio / Elevator Pitch */}
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              A passionate <strong className="text-white">Software Engineer</strong> specializing in 
              robust backend systems and modern full-stack architectures. Proven expertise in 
              <span className="tech-badge">Java</span>, <span className="tech-badge">Spring Boot</span>, 
              <span className="tech-badge">Python</span>, <span className="tech-badge">React</span>, 
              and <span className="tech-badge">GenAI / LangChain</span> with 
              <strong className="text-cyan"> 600+ algorithmic problems solved</strong>.
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div
              className="hero-actions-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <ScrollLink
                to="projects"
                offset={-70}
                className="btn-glow hero-primary-cta"
                onClick={() => soundFx.playClick()}
                data-cursor
              >
                <HiSparkles size={16} />
                <span>Explore Projects</span>
              </ScrollLink>

              <ScrollLink
                to="contact"
                offset={-70}
                className="btn-outline hero-secondary-cta"
                onClick={() => soundFx.playClick()}
                data-cursor
              >
                <FiMail size={16} />
                <span>Let's Connect</span>
              </ScrollLink>

              <button
                className="btn-outline cmd-hint-btn"
                onClick={() => {
                  soundFx.playClick()
                  openCmd()
                }}
                data-cursor
                data-tooltip="Press Ctrl+K anytime"
              >
                <FiTerminal size={15} />
                <span>Command Menu</span>
                <kbd className="hero-kbd">⌘K</kbd>
              </button>
            </motion.div>

            {/* Verified Social Connectors */}
            <motion.div
              className="hero-social-strip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="social-strip-label">Find me on:</span>
              <div className="social-links-group">
                {[
                  { icon: <FiGithub />, href: 'https://github.com/Younus00007', label: 'GitHub' },
                  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/younuscse/', label: 'LinkedIn' },
                  { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Younus07/', label: 'LeetCode (600+)' },
                  { icon: <FiMail />, href: 'mailto:younustheman@gmail.com', label: 'Email' },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-btn"
                    onClick={() => soundFx.playClick()}
                    data-cursor
                    data-tooltip={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Floating Tech Universe & Code Preview Card */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="hero-visual-inner">
              {/* Interactive Terminal Card */}
              <div className="hero-code-card glass-card spotlight-card">
                <div className="code-card-header">
                  <div className="window-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="code-card-title">
                    <FiCode size={13} />
                    <span>architect.config.ts</span>
                  </div>
                  <span className="code-live-pill">v2.0 • Online</span>
                </div>

                <div className="code-card-body">
                  <pre>
                    <code>
                      <span className="code-keyword">interface</span> <span className="code-type">Engineer</span> {'{\n'}
                      {'  '}name: <span className="code-string">"Muhammad Younus A"</span>;{'\n'}
                      {'  '}role: <span className="code-string">"Full-Stack & Backend"</span>;{'\n'}
                      {'  '}skills: <span className="code-type">string</span>[];{'\n'}
                      {'  '}leetcodeSolved: <span className="code-number">600+</span>;{'\n'}
                      {'  '}status: <span className="code-string">"READY_TO_DEPLOY"</span>;{'\n'}
                      {'}\n\n'}
                      <span className="code-keyword">const</span> <span className="code-var">candidate</span>: <span className="code-type">Engineer</span> = {'{\n'}
                      {'  '}name: <span className="code-string">"Younus"</span>,{'\n'}
                      {'  '}focus: [<span className="code-string">"Spring Boot"</span>, <span className="code-string">"GenAI"</span>, <span className="code-string">"React"</span>],{'\n'}
                      {'  '}passion: <span className="code-string">"Building Scalable Impact"</span>,{'\n'}
                      {'  '}hireable: <span className="code-bool">true</span>{'\n'}
                      {'}'}
                    </code>
                  </pre>
                </div>

                <div className="code-card-footer">
                  <div className="footer-metric">
                    <FiCheckCircle className="metric-check" />
                    <span>CI/CD Tests Passing</span>
                  </div>
                  <span className="footer-runtime">60 FPS Smooth</span>
                </div>
              </div>

              {/* Dedicated Interactive Tech Stack Dock */}
              <div className="hero-tech-dock">
                {orbitTech.map(({ icon, label }) => (
                  <motion.div
                    key={label}
                    className="tech-dock-chip glass-card"
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    onClick={() => soundFx.playClick()}
                    onMouseEnter={() => soundFx.playHover()}
                    data-cursor
                    data-tooltip={`Core Tech: ${label}`}
                  >
                    <span className="dock-icon">{icon}</span>
                    <span className="dock-label">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Animated Metrics Grid */}
        <motion.div
          className="hero-metrics-grid"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          {stats.map(({ number, suffix, label, desc }) => (
            <div key={label} className="metric-card glass-card spotlight-card" data-cursor>
              <div className="metric-number-wrapper">
                <span className="metric-number gradient-text">
                  <AnimatedCounter end={number} duration={2.2} />
                </span>
                <span className="metric-suffix gradient-text">{suffix}</span>
              </div>
              <span className="metric-label">{label}</span>
              <span className="metric-desc">{desc}</span>
            </div>
          ))}
        </motion.div>

        {/* Animated Scroll Down Prompt */}
        <motion.div
          className="hero-scroll-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <ScrollLink
            to="about"
            offset={-70}
            className="scroll-down-btn"
            onClick={() => soundFx.playClick()}
            data-cursor
            data-tooltip="Scroll to explore"
          >
            <span className="scroll-mouse-wheel">
              <span className="wheel-dot" />
            </span>
            <span className="scroll-text">SCROLL DOWN</span>
            <FiArrowDown className="scroll-arrow" />
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  )
}
