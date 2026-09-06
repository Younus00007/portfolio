import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiCode, FiServer, FiCloud, FiCpu, FiCheck, 
  FiCopy, FiMapPin, FiCompass, FiTerminal, FiAward, FiBookOpen 
} from 'react-icons/fi'
import profilePic from '../assets/profile_pic.png'
import { soundFx } from '../utils/SoundEffects'
import './About.css'

const specialisations = [
  {
    icon: <FiServer />,
    title: 'Backend Engineering',
    color: '#06b6d4',
    desc: 'Scalable RESTful microservices, event-driven architectures, and high-throughput systems engineered with Java, Spring Boot, and Node.js.',
    tags: ['Spring Boot', 'Java', 'PostgreSQL', 'APIs']
  },
  {
    icon: <FiCpu />,
    title: 'GenAI & AI Agents',
    color: '#a855f7',
    desc: 'Autonomous AI workflows, RAG pipelines, and intelligent model orchestrations built with LangChain, LangGraph, and Python LLM integrations.',
    tags: ['LangChain', 'LangGraph', 'RAG', 'Python']
  },
  {
    icon: <FiCode />,
    title: 'Modern Frontend',
    color: '#ec4899',
    desc: 'Pixel-perfect, fluid, and responsive digital interfaces crafted using React, modern JavaScript, TailwindCSS, and GPU-accelerated micro-animations.',
    tags: ['React', 'JavaScript', 'TailwindCSS', 'Framer']
  },
  {
    icon: <FiCloud />,
    title: 'Cloud, DevOps & Data',
    color: '#10b981',
    desc: 'Containerization, relational and vector database modeling, Git version control, and production-ready deployments.',
    tags: ['Docker', 'Git', 'SQL', 'CI/CD']
  },
]

const codeTabs = {
  'about.ts': `// Muhammad Younus A — Core Profile
export const engineer = {
  name: "Muhammad Younus A",
  role: "Full-Stack Developer (Backend Focus)",
  education: "B.E. CSE @ Nanda Engineering College",
  location: "India 🇮🇳",
  passions: [
    "High-Performance Backend Architecture",
    "Generative AI & LLM Systems",
    "Algorithmic Problem Solving (600+ LeetCode)",
    "Clean & Maintainable Codebases"
  ],
  readyForHire: true
};`,
  'stack.json': `{
  "languages": ["Java", "Python", "JavaScript", "SQL"],
  "frameworks": ["Spring Boot", "React", "Node.js", "Express"],
  "ai_ml": ["LangChain", "LangGraph", "Machine Learning"],
  "databases": ["PostgreSQL", "MySQL"],
  "devops": ["Docker", "Git", "REST APIs"]
}`,
  'mindset.md': `### Engineering Philosophy
- **Scalability First**: Architect with clean modularity and solid design patterns.
- **Problem Solver**: 600+ LeetCode problems solved with optimal time/space complexity.
- **Continuous Learner**: Exploring cutting-edge AI agentic workflows daily.`
}

export default function About({ showToast }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeTab, setActiveTab] = useState('about.ts')
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    soundFx.playClick()
    navigator.clipboard.writeText(codeTabs[activeTab])
    setCopied(true)
    if (showToast) showToast(`Copied ${activeTab} to clipboard! ✓`)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="about-section">
      <div className="about-ambient-glow" />

      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="section-header">
            <div className="section-tag">About The Architect</div>
            <h2 className="section-title">
              Crafting <span className="gradient-text">digital excellence</span><br />
              through engineering & design
            </h2>
            <p className="section-subtitle">
              Bridging the power of scalable backend architectures with intuitive, 
              futuristic user interfaces and intelligent GenAI capabilities.
            </p>
          </div>

          <div className="about-layout-grid">
            {/* Left Column: Bio Card & Interactive IDE */}
            <div className="about-left-col">
              {/* Profile Bio Card */}
              <div className="bio-card glass-card spotlight-card" data-cursor>
                <div className="bio-card-top">
                  <div className="avatar-wrapper">
                    <div className="avatar-ring-glow" />
                    <div className="avatar-ring-outer" />
                    <div className="avatar-img-container">
                      <img src={profilePic} alt="Muhammad Younus A" className="avatar-photo" />
                    </div>
                    <span className="avatar-verified-badge" title="Verified Developer">✓</span>
                  </div>

                  <div className="bio-headline">
                    <div className="bio-badge-row">
                      <span className="bio-status-pill">
                        <span className="bio-status-beacon" /> Available for Hire
                      </span>
                      <span className="bio-loc-pill">
                        <FiMapPin /> India
                      </span>
                    </div>
                    <h3 className="bio-name">Muhammad Younus A</h3>
                    <p className="bio-role">Fresher Full-Stack Developer • Backend Specialist</p>
                  </div>
                </div>

                <div className="bio-body-text">
                  <p>
                    I'm a fresh graduate in <strong>Computer Science and Engineering</strong> from 
                    <strong> Nanda Engineering College</strong> with an obsession for high-performance systems 
                    and beautiful digital experiences.
                  </p>
                  <p>
                    My core strength lies in <strong>Backend Engineering</strong>, where I design robust APIs and 
                    orchestrate artificial intelligence models using <strong>Spring Boot, Python, and LangChain</strong>. 
                    I'm deeply committed to algorithmic excellence, having solved 
                    <strong className="text-cyan"> over 600 problems on LeetCode</strong>.
                  </p>
                </div>

                <div className="bio-pills-row">
                  {['Java', 'Python', 'Spring Boot', 'React', 'LangChain', 'Node.js', 'PostgreSQL', 'Docker'].map(tag => (
                    <span key={tag} className="bio-tech-pill">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Interactive IDE Terminal Card */}
              <div className="ide-terminal glass-card spotlight-card">
                <div className="ide-header">
                  <div className="ide-tabs">
                    {Object.keys(codeTabs).map(tab => (
                      <button
                        key={tab}
                        className={`ide-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => {
                          soundFx.playClick()
                          setActiveTab(tab)
                        }}
                      >
                        <FiTerminal size={12} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>

                  <button 
                    className="ide-copy-btn" 
                    onClick={handleCopyCode} 
                    title="Copy code"
                    data-cursor
                  >
                    {copied ? <FiCheck size={14} color="#10b981" /> : <FiCopy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="ide-content">
                  <pre>
                    <code>{codeTabs[activeTab]}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Specialisation Cards with Spotlight */}
            <div className="about-right-col">
              <div className="specialisations-grid">
                {specialisations.map((spec, i) => (
                  <motion.div
                    key={spec.title}
                    className="spec-card glass-card spotlight-card"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    data-cursor
                  >
                    <div className="spec-card-header">
                      <div 
                        className="spec-icon" 
                        style={{ color: spec.color, background: `${spec.color}15`, borderColor: `${spec.color}30` }}
                      >
                        {spec.icon}
                      </div>
                      <span className="spec-index">0{i + 1}</span>
                    </div>

                    <h4 className="spec-title">{spec.title}</h4>
                    <p className="spec-desc">{spec.desc}</p>

                    <div className="spec-tags">
                      {spec.tags.map(tag => (
                        <span key={tag} className="spec-tag" style={{ color: spec.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
