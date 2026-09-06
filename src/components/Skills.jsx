import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  SiSpringboot, SiReact, SiPython, SiDocker, SiPostgresql, 
  SiJavascript, SiTailwindcss, SiGit, SiNodedotjs, 
  SiExpress, SiHtml5, SiLeetcode, SiLangchain
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { FiLayers, FiCheckCircle } from 'react-icons/fi'
import { soundFx } from '../utils/SoundEffects'
import './Skills.css'

const categories = ['All', 'Backend', 'Frontend', 'GenAI & Tools']

const skillsData = [
  // Backend
  {
    name: 'Java / OOP',
    level: 90,
    category: 'Backend',
    color: '#ea580c',
    icon: <FaJava />,
    experience: 'Core Strength'
  },
  {
    name: 'Python',
    level: 90,
    category: 'Backend',
    color: '#3b82f6',
    icon: <SiPython />,
    experience: 'ML & Scripting'
  },
  {
    name: 'Spring Boot',
    level: 85,
    category: 'Backend',
    color: '#10b981',
    icon: <SiSpringboot />,
    experience: 'REST APIs & Arch'
  },
  {
    name: 'Node.js & Express',
    level: 88,
    category: 'Backend',
    color: '#22c55e',
    icon: <SiNodedotjs />,
    experience: 'Asynchronous I/O'
  },
  {
    name: 'PostgreSQL / SQL',
    level: 82,
    category: 'Backend',
    color: '#336791',
    icon: <SiPostgresql />,
    experience: 'Relational Modeling'
  },

  // Frontend
  {
    name: 'React.js',
    level: 86,
    category: 'Frontend',
    color: '#06b6d4',
    icon: <SiReact />,
    experience: 'Components & Hooks'
  },
  {
    name: 'Modern JavaScript (ES6+)',
    level: 88,
    category: 'Frontend',
    color: '#facc15',
    icon: <SiJavascript />,
    experience: 'Async & Logic'
  },
  {
    name: 'Tailwind CSS',
    level: 84,
    category: 'Frontend',
    color: '#38bdf8',
    icon: <SiTailwindcss />,
    experience: 'Utility UI Design'
  },
  {
    name: 'HTML5 & Modern CSS3',
    level: 92,
    category: 'Frontend',
    color: '#f97316',
    icon: <SiHtml5 />,
    experience: 'Responsive Layouts'
  },

  // GenAI & Tools
  {
    name: 'LangChain & LangGraph',
    level: 84,
    category: 'GenAI & Tools',
    color: '#a855f7',
    icon: <SiLangchain />,
    experience: 'LLM Orchestration'
  },
  {
    name: 'Algorithmic Problem Solving',
    level: 95,
    category: 'GenAI & Tools',
    color: '#f59e0b',
    icon: <SiLeetcode />,
    experience: '600+ Solved'
  },
  {
    name: 'Docker & Containerization',
    level: 80,
    category: 'GenAI & Tools',
    color: '#0284c7',
    icon: <SiDocker />,
    experience: 'Containers & Images'
  },
  {
    name: 'Git & GitHub Collaboration',
    level: 88,
    category: 'GenAI & Tools',
    color: '#ef4444',
    icon: <SiGit />,
    experience: 'Version Control'
  },
]

const marqueeIcons = [
  { name: 'Java', icon: <FaJava color="#ea580c" /> },
  { name: 'Spring Boot', icon: <SiSpringboot color="#10b981" /> },
  { name: 'Python', icon: <SiPython color="#3b82f6" /> },
  { name: 'React', icon: <SiReact color="#06b6d4" /> },
  { name: 'LangChain', icon: <SiLangchain color="#a855f7" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql color="#336791" /> },
  { name: 'Node.js', icon: <SiNodedotjs color="#22c55e" /> },
  { name: 'Docker', icon: <SiDocker color="#0284c7" /> },
  { name: 'Git', icon: <SiGit color="#ef4444" /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss color="#38bdf8" /> },
  { name: 'Express', icon: <SiExpress color="#ffffff" /> },
  { name: 'LeetCode 600+', icon: <SiLeetcode color="#f59e0b" /> },
]

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter(s => s.category === selectedCategory)

  return (
    <section id="skills" className="skills-section">
      <div className="skills-ambient-glow" />

      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="section-header">
            <div className="section-tag">Technical Repertoire</div>
            <h2 className="section-title">
              Engineered with <span className="gradient-text">modern technologies</span>
            </h2>
            <p className="section-subtitle">
              A comprehensive toolkit developed through thousands of hours of building production-ready 
              services, solving complex algorithmic challenges, and exploring AI.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="skills-filter-container">
            <div className="skills-filter-pill glass-card">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    className={`skills-cat-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      soundFx.playClick()
                      setSelectedCategory(cat)
                    }}
                    data-cursor
                  >
                    {cat}
                    {isSelected && (
                      <motion.div
                        className="skills-cat-indicator"
                        layoutId="activeSkillCat"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive Skills Grid */}
          <motion.div layout className="skills-interactive-grid">
            <AnimatePresence>
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="skill-card glass-card spotlight-card"
                  whileHover={{ y: -5, scale: 1.02 }}
                  data-cursor
                >
                  <div className="skill-card-top">
                    <div 
                      className="skill-icon-wrap"
                      style={{ 
                        color: skill.color, 
                        background: `${skill.color}15`, 
                        borderColor: `${skill.color}35` 
                      }}
                    >
                      {skill.icon}
                    </div>

                    <div className="skill-pct-badge" style={{ color: skill.color }}>
                      <span>{skill.level}%</span>
                    </div>
                  </div>

                  <div className="skill-card-info">
                    <h3 className="skill-card-name">{skill.name}</h3>
                    <span className="skill-card-exp">{skill.experience}</span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="skill-progress-track">
                    <motion.div
                      className="skill-progress-fill"
                      style={{ background: skill.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="progress-glow-tip" style={{ background: skill.color }} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Dual Seamless Infinite Marquee */}
          <div className="skills-marquee-container">
            <div className="marquee-header-label">
              <span>CONTINUOUSLY EXPANDING TECH STACK</span>
            </div>

            <div className="marquee-infinite-wrapper">
              <div className="marquee-track marquee-forward">
                {[...marqueeIcons, ...marqueeIcons].map((item, idx) => (
                  <div key={idx} className="marquee-chip glass-card" data-cursor>
                    <span className="chip-icon">{item.icon}</span>
                    <span className="chip-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
