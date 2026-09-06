import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiBriefcase, FiBook, FiAward, FiCheckCircle, 
  FiExternalLink, FiMaximize2, FiX, FiTrendingUp, FiCpu 
} from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import shieldImg from '../assets/shield.png'
import { soundFx } from '../utils/SoundEffects'
import './Experience.css'

const education = [
  {
    type: 'edu',
    role: 'B.E. in Computer Science and Engineering',
    institution: 'Nanda Engineering College',
    period: 'Completed',
    status: 'Graduated',
    desc: 'Acquired strong fundamentals across software architecture, distributed algorithms, data structures, object-oriented design, and database management systems.',
    highlights: ['Algorithm Analysis', 'System Architecture', 'Operating Systems', 'OOP Paradigm'],
    accent: '#06b6d4'
  }
]

const achievements = [
  {
    type: 'trophy',
    title: '2nd Prize Winner — Generative AI Track',
    organization: 'Garuda (State-Level Hackathon)',
    period: 'Recent',
    badge: '🏆 2nd Place',
    desc: 'Architected and presented a production-ready Generative AI platform under intense competitive timelines. Commended for technical innovation, resilient system design, and prompt engineering precision.',
    tech: ['GenAI', 'LLMs', 'Hackathon Winner', 'RAG Pipeline'],
    image: shieldImg,
    accent: '#f59e0b'
  },
  {
    type: 'leetcode',
    title: 'LeetCode Problem Solving Expert',
    organization: 'LeetCode Algorithms Platform',
    period: 'Active & Ongoing',
    badge: '⚡ 600+ Solved',
    desc: 'Mastered over 600 algorithmic challenges spanning dynamic programming, graph theory, trees, binary search, and mathematical optimizations. Dedicated to writing clean, time-optimal code.',
    stats: [
      { label: 'Total Solved', val: '600+' },
      { label: 'Top Categories', val: 'DP, Graphs, Trees' },
      { label: 'Profile', val: 'Younus07' }
    ],
    tech: ['Algorithms', 'Data Structures', 'Time Complexity', 'Optimal Space'],
    link: 'https://leetcode.com/u/Younus07/',
    accent: '#ea580c'
  },
  {
    type: 'cert',
    title: 'Sun Java Certified Professional',
    organization: 'CSC Academy & Sun Java Standards',
    period: 'Achieved',
    badge: '📜 Certified',
    desc: 'Earned comprehensive certification proving deep proficiency in Core Java, multithreading, OOP paradigms, JVM memory management, and collection frameworks.',
    tech: ['Java Core', 'OOP Architecture', 'Multithreading', 'Collections'],
    accent: '#a855f7'
  }
]

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <section id="experience" className="experience-section">
      <div className="exp-ambient-glow" />

      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="section-header">
            <div className="section-tag">Career Journey & Milestones</div>
            <h2 className="section-title">
              Proven <span className="gradient-text">education & achievements</span>
            </h2>
            <p className="section-subtitle">
              A chronological track record of academic excellence, competitive coding rigor, 
              and state-level hackathon recognitions.
            </p>
          </div>

          <div className="exp-dual-layout">
            {/* Left Column: Education Timeline */}
            <div className="exp-column">
              <div className="column-title-box">
                <div className="col-icon-box edu-col-icon">
                  <FiBook />
                </div>
                <div>
                  <h3 className="column-heading">Education Background</h3>
                  <span className="column-subheading">Foundation in Computer Science</span>
                </div>
              </div>

              <div className="timeline-track">
                {education.map((item, idx) => (
                  <div key={idx} className="timeline-node">
                    <div className="node-beacon" style={{ borderColor: item.accent }}>
                      <span className="beacon-core" style={{ background: item.accent }} />
                    </div>

                    <div className="timeline-card glass-card spotlight-card" data-cursor>
                      <div className="timeline-card-header">
                        <div>
                          <span className="node-period-pill">{item.period}</span>
                          <h4 className="node-title">{item.role}</h4>
                          <p className="node-org" style={{ color: item.accent }}>{item.institution}</p>
                        </div>
                        <span className="node-status-badge">{item.status}</span>
                      </div>

                      <p className="node-desc">{item.desc}</p>

                      <div className="node-tags-row">
                        {item.highlights.map(h => (
                          <span key={h} className="node-tag">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Additional engineering highlights widget */}
                <div className="timeline-highlight-box glass-card spotlight-card">
                  <div className="highlight-icon-row">
                    <FiTrendingUp className="highlight-icon" />
                    <span className="highlight-title">Academic & Technical Strengths</span>
                  </div>
                  <ul className="highlight-list">
                    <li>✓ Consistent focus on backend systems, OS concepts, and database internals.</li>
                    <li>✓ Deep understanding of clean architecture, SOLID principles, and microservices.</li>
                    <li>✓ Completed capstone and live client projects with production deployments.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Achievements & Certifications */}
            <div className="exp-column">
              <div className="column-title-box">
                <div className="col-icon-box ach-col-icon">
                  <FiAward />
                </div>
                <div>
                  <h3 className="column-heading">Milestones & Certifications</h3>
                  <span className="column-subheading">Hackathons & Algorithmic Mastery</span>
                </div>
              </div>

              <div className="achievements-list">
                {achievements.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="achieve-card glass-card spotlight-card"
                    whileHover={{ y: -4 }}
                    data-cursor
                  >
                    <div className="achieve-top-bar">
                      <div className="achieve-meta">
                        <span className="achieve-badge" style={{ borderColor: `${item.accent}50`, color: item.accent }}>
                          {item.badge}
                        </span>
                        <span className="achieve-period">{item.period}</span>
                      </div>
                    </div>

                    <h4 className="achieve-title">{item.title}</h4>
                    <p className="achieve-org" style={{ color: item.accent }}>{item.organization}</p>
                    <p className="achieve-desc">{item.desc}</p>

                    {/* LeetCode Special Stats Row */}
                    {item.stats && (
                      <div className="achieve-stats-row">
                        {item.stats.map(s => (
                          <div key={s.label} className="achieve-stat-pill">
                            <span className="stat-label">{s.label}:</span>
                            <strong className="stat-val">{s.val}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Trophy Shield Image Display with Zoom Lightbox */}
                    {item.image && (
                      <div 
                        className="achieve-trophy-preview glass-card"
                        onClick={() => {
                          soundFx.playChime()
                          setLightboxImage(item.image)
                        }}
                        title="Click to view trophy certificate"
                        data-cursor
                      >
                        <div className="trophy-glow-halo" />
                        <img src={item.image} alt={item.title} className="trophy-img" />
                        <span className="trophy-zoom-cue">
                          <FiMaximize2 size={13} /> Tap to expand trophy
                        </span>
                      </div>
                    )}

                    {/* Bottom Tags and Link */}
                    <div className="achieve-footer">
                      <div className="achieve-tags">
                        {item.tech.map(t => (
                          <span key={t} className="achieve-tag">{t}</span>
                        ))}
                      </div>

                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-outline achieve-link-btn"
                          onClick={() => soundFx.playClick()}
                          data-cursor
                        >
                          <SiLeetcode /> View Profile
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal for Hackathon Trophy */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="lightbox-box glass-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
                <FiX size={18} />
              </button>
              <img src={lightboxImage} alt="Award Trophy" className="lightbox-img" />
              <div className="lightbox-caption">
                <h4>2nd Prize Winner — Garuda GenAI Hackathon</h4>
                <p>Awarded to Muhammad Younus A for innovative Generative AI integration.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
