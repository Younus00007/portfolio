import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import ThreeBackground from './ThreeBackground'
import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <ThreeBackground />
      
      {/* Orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      <div className="container hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="badge-dot" />
          <span>Available for work</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Hi, I'm{' '}
          <span className="hero-name gradient-text">Muhammad Younus A</span>
        </motion.h1>

        <motion.div
          className="hero-typewriter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="type-prefix">I </span>
          <TypeAnimation
            sequence={[
              'am a Full-Stack Developer.', 2000,
              'am a Backend Specialist.', 2000,
              'build GenAI solutions.', 2000,
              'solve complex problems.', 2000,
            ]}
            wrapper="span"
            speed={50}
            deletionSpeed={65}
            repeat={Infinity}
            className="type-text gradient-text-pink"
          />
        </motion.div>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          A passionate software engineering fresher building scalable digital
          solutions. I specialize in Java, Python, Spring Boot, React, and GenAI integrations.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link to="projects" smooth duration={50} offset={-70} className="btn-glow" data-cursor>
            View My Work
          </Link>
          <Link to="contact" smooth duration={50} offset={-70} className="btn-outline" data-cursor>
            Let's Talk
          </Link>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            { icon: <FiGithub />, href: 'https://github.com/Younus00007', label: 'GitHub' },
            { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/younuscse/', label: 'LinkedIn' },
            { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Younus07/', label: 'LeetCode' },
          ].map(({ icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link" data-cursor title={label}>
              {icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Link to="about" smooth duration={50} offset={-70} data-cursor>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FiArrowDown size={20} />
          </motion.div>
        </Link>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {[
          { value: '600+', label: 'LeetCode Solved' },
          { value: 'Backend', label: 'Primary Focus' },
          { value: 'GenAI', label: 'Enthusiast' },
          { value: 'Fresher', label: 'Ready to Work' },
        ].map(({ value, label }) => (
          <div className="hero-stat glass-card" key={label}>
            <span className="stat-value gradient-text" style={{ fontSize: '1.4rem' }}>{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
