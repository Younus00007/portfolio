import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiExternalLink, FiGithub, FiMaximize2, FiX, 
  FiCheck, FiLayers, FiActivity, FiGlobe, FiCode 
} from 'react-icons/fi'
import { soundFx } from '../utils/SoundEffects'
import './Projects.css'

const categories = ['All', 'Featured', 'GenAI & ML', 'Full-Stack']

const projects = [
  {
    id: 'arrow-fitness',
    title: 'Arrow Fitness Centre',
    category: 'Full-Stack',
    description: 'A fully deployed modern fitness enterprise website providing gym services, interactive facility walkthroughs, pricing tiers, and membership registration.',
    longDesc: 'Designed and deployed a responsive commercial web platform for Arrow Fitness Centre. Integrated seamless booking interfaces, facility showcase galleries, dynamic membership inquiries, and custom UX micro-interactions optimized for high conversions.',
    tags: ['Web Development', 'UI/UX', 'Deployed', 'Production'],
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    accentColor: '#f97316',
    emoji: '🏋️‍♂️',
    link: 'https://www.arrowfitnesscentre.com/',
    featured: true,
    stats: { users: 'Live Deployed', uptime: '99.9%', role: 'Lead Developer' }
  },
  {
    id: 'heart-disease-prediction',
    title: 'Heart Disease Prediction System',
    category: 'GenAI & ML',
    description: 'A machine learning system engineered to predict cardiovascular disease likelihood using clinical biomarker data and phonocardiogram (PCG) acoustic signals.',
    longDesc: 'Engineered an end-to-end medical ML pipeline processing clinical tabular records alongside PCG heart sound recordings. Applied audio feature extraction (MFCCs, spectrograms) and ensemble classifiers to detect valvular heart disease with high predictive accuracy.',
    tags: ['Python', 'Machine Learning', 'Data Science', 'PCG Audio'],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    accentColor: '#ec4899',
    emoji: '🫀',
    github: 'https://github.com/Younus00007/pcg_vhd_project',
    featured: true,
    stats: { accuracy: 'High Precision', domain: 'Healthcare ML', stack: 'Scikit-Learn' }
  },
  {
    id: 'ai-legal-case-prediction',
    title: 'AI Legal Case Prediction System',
    category: 'GenAI & ML',
    description: 'An AI-driven platform that predicts case outcomes and analyzes judicial precedents through NLP pipelines and LangChain retrieval workflows.',
    longDesc: 'Architected a Generative AI legal research assistant that digests landmark court rulings and case briefs. Leveraged LangChain RAG workflows and NLP semantic similarity algorithms to forecast judicial trends and surface relevant case precedents.',
    tags: ['GenAI', 'Python', 'NLP', 'LangChain', 'RAG'],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    accentColor: '#a855f7',
    emoji: '⚖️',
    github: 'https://github.com/Younus00007/AI_BASED_LEGAL_CASE_PREDICTION_SYSTEM',
    featured: true,
    stats: { tech: 'LangChain RAG', data: 'Court Precedents', role: 'AI Architect' }
  },
  {
    id: 'cinisence',
    title: 'Cinisence',
    category: 'GenAI & ML',
    description: 'An emotion-aware movie recommendation engine that interprets user mood, sentiment, and emotional nuances to suggest tailored cinematic experiences.',
    longDesc: 'Developed a mood-driven content discovery engine that moves beyond static genre tags. Uses sentiment analysis and content-based filtering algorithms to align user emotional inputs with thematic storytelling motifs.',
    tags: ['Python', 'Machine Learning', 'NLP', 'Recommendation System'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    accentColor: '#10b981',
    emoji: '🎬',
    github: 'https://github.com/Younus00007/Cinisence-',
    featured: false,
    stats: { algorithm: 'Sentiment KNN', output: 'Real-time Picks', type: 'ML Engine' }
  },
  {
    id: 'campus-recruitment-system',
    title: 'Campus Recruitment System',
    category: 'Full-Stack',
    description: 'A full-stack enterprise portal streamlining student placements, recruitment drives, candidate shortlisting, and administrative workflows.',
    longDesc: 'Engineered a multi-tenant university placement platform with role-based access control (Students, Recruiters, Placement Cell). Backed by Java Spring Boot REST microservices and a normalized MySQL database for secure credential and applicant tracking.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs'],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    accentColor: '#06b6d4',
    emoji: '🎓',
    github: 'https://github.com/Younus00007/Campus-recruitment-system',
    featured: false,
    stats: { backend: 'Spring Boot', db: 'MySQL Relational', security: 'Role-based Auth' }
  },
  {
    id: 'map-review-app',
    title: 'Map Review App',
    category: 'Full-Stack',
    description: 'A location-based geospatial feedback platform enabling users to drop pins on an interactive map and publish localized reviews.',
    longDesc: 'Created an interactive geospatial exploration web application. Incorporates map coordinates, geo-pinning, custom review publishing, and user authentication backed by an Express and Node.js REST API.',
    tags: ['Node.js', 'Express', 'JavaScript', 'Geospatial', 'Web'],
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    accentColor: '#f59e0b',
    emoji: '🗺️',
    github: 'https://github.com/Younus00007/Review-map',
    featured: false,
    stats: { maps: 'Interactive Pins', runtime: 'Node/Express', feed: 'Community Driven' }
  },
]

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeModalProject, setActiveModalProject] = useState(null)

  const filteredProjects = projects.filter(p => {
    if (activeCategory === 'All') return true
    if (activeCategory === 'Featured') return p.featured
    return p.category === activeCategory
  })

  const openProjectModal = (proj) => {
    soundFx.playChime()
    setActiveModalProject(proj)
  }

  const closeProjectModal = () => {
    soundFx.playClick()
    setActiveModalProject(null)
  }

  // 3D Card tilt effect on mouse movement
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 7

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
  }

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <section id="projects" className="projects-section">
      <div className="projects-ambient-glow" />

      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="section-header">
            <div className="section-tag">Featured Portfolio</div>
            <h2 className="section-title">
              Crafted with <span className="gradient-text">precision & purpose</span>
            </h2>
            <p className="section-subtitle">
              A curated collection of production web applications, machine learning architectures, 
              and generative AI systems solving real-world challenges.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="projects-filter-bar">
            <div className="projects-filter-pill glass-card">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat
                return (
                  <button
                    key={cat}
                    className={`proj-cat-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      soundFx.playClick()
                      setActiveCategory(cat)
                    }}
                    data-cursor
                  >
                    {cat}
                    {isSelected && (
                      <motion.div
                        className="proj-cat-indicator"
                        layoutId="activeProjCat"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Projects Interactive Grid */}
          <motion.div layout className="projects-grid-layout">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className={`project-card glass-card spotlight-card ${project.featured ? 'featured' : ''}`}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => openProjectModal(project)}
                  data-cursor
                >
                  {/* Visual Header Banner */}
                  <div className="project-banner-surface" style={{ background: project.gradient }}>
                    <div className="banner-pattern-overlay" />
                    <span className="project-emoji-hero">{project.emoji}</span>

                    <div className="banner-badges">
                      {project.featured && (
                        <span className="badge-featured">⭐ Featured</span>
                      )}
                      {project.link && (
                        <span className="badge-live-prod">● Deployed</span>
                      )}
                    </div>

                    <button 
                      className="quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        openProjectModal(project)
                      }}
                      title="Quick Architecture View"
                    >
                      <FiMaximize2 size={13} />
                      <span>Details</span>
                    </button>
                  </div>

                  {/* Project Content Body */}
                  <div className="project-card-body">
                    <div className="project-meta-top">
                      <span className="project-category-label">{project.category}</span>
                    </div>

                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-desc">{project.description}</p>

                    {/* Tech Pills */}
                    <div className="project-tags-cloud">
                      {project.tags.map(tag => (
                        <span key={tag} className="project-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Direct Action Links */}
                    <div className="project-card-actions" onClick={(e) => e.stopPropagation()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline proj-action-btn"
                          onClick={() => soundFx.playClick()}
                          data-cursor
                        >
                          <FiGithub size={14} />
                          <span>Code</span>
                        </a>
                      )}

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-glow proj-action-btn live-btn"
                          onClick={() => soundFx.playClick()}
                          data-cursor
                        >
                          <FiExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}

                      <button
                        className="btn-outline proj-action-btn details-btn"
                        onClick={() => openProjectModal(project)}
                        data-cursor
                      >
                        <FiLayers size={13} />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Modal / Drawer */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            className="proj-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.div
              className="proj-modal-dialog glass-card"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="proj-modal-banner" 
                style={{ background: activeModalProject.gradient }}
              >
                <span className="modal-emoji">{activeModalProject.emoji}</span>
                <button className="modal-close-btn" onClick={closeProjectModal}>
                  <FiX size={18} />
                </button>
              </div>

              <div className="proj-modal-content">
                <div className="modal-header-row">
                  <div>
                    <span className="modal-category">{activeModalProject.category}</span>
                    <h3 className="modal-title">{activeModalProject.title}</h3>
                  </div>

                  <div className="modal-links-row">
                    {activeModalProject.github && (
                      <a 
                        href={activeModalProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-outline modal-link-btn"
                      >
                        <FiGithub /> GitHub Repository
                      </a>
                    )}
                    {activeModalProject.link && (
                      <a 
                        href={activeModalProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-glow modal-link-btn"
                      >
                        <FiExternalLink /> Visit Live Site
                      </a>
                    )}
                  </div>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-heading">Overview & Architecture</h4>
                  <p className="modal-desc-text">{activeModalProject.longDesc}</p>
                </div>

                {/* Key Metrics / Highlights */}
                {activeModalProject.stats && (
                  <div className="modal-stats-row">
                    {Object.entries(activeModalProject.stats).map(([key, val]) => (
                      <div key={key} className="modal-stat-box glass-card">
                        <span className="stat-key">{key}</span>
                        <span className="stat-val gradient-text">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="modal-section">
                  <h4 className="modal-section-heading">Technologies Utilized</h4>
                  <div className="modal-tags-row">
                    {activeModalProject.tags.map(t => (
                      <span key={t} className="modal-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
