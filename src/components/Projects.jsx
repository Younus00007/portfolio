import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    title: 'Heart Disease Prediction System',
    description: 'A machine learning system designed to predict the likelihood of heart disease using medical data and PCG audio signals.',
    tags: ['Python', 'Machine Learning', 'Data Science'],
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    emoji: '🫀',
    github: 'https://github.com/Younus00007/pcg_vhd_project',
    featured: true,
  },
  {
    title: 'AI Legal Case Prediction System',
    description: 'An AI-driven platform that predicts outcomes for legal cases by analyzing past precedents and case documents.',
    tags: ['GenAI', 'Python', 'NLP', 'LangChain'],
    gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
    emoji: '⚖️',
    github: 'https://github.com/Younus00007/AI_BASED_LEGAL_CASE_PREDICTION_SYSTEM',
    featured: true,
  },
  {
    title: 'Cinisence',
    description: 'An emotion-based movie recommendation application that suggests films based on the users current mood.',
    tags: ['Python', 'Machine Learning', 'Recommendation System'],
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    emoji: '🎬',
    github: 'https://github.com/Younus00007/Cinisence-',
    featured: false,
  },
  {
    title: 'Campus Recruitment System',
    description: 'A full-stack web application designed to streamline the campus placement process for students and administrators.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
    gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    emoji: '🎓',
    github: 'https://github.com/Younus00007/Campus-recruitment-system',
    featured: false,
  },
  {
    title: 'Map Review App',
    description: 'A location-based review application allowing users to pin locations on a map and leave feedback or reviews.',
    tags: ['Node.js', 'Express', 'JavaScript', 'Web'],
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    emoji: '🗺️',
    github: 'https://github.com/Younus00007/Review-map',
    featured: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="projects" className="projects-section">
      <div className="projects-orb" />
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={cardVariants}>
            <div className="section-tag">Projects</div>
            <h2 className="section-title">
              Things I've <span className="gradient-text">built</span>
            </h2>
            <p className="section-subtitle">
              A curated selection of projects that showcase my craft, problem-solving, and attention to detail.
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Top gradient banner */}
                <div className="project-banner" style={{ background: project.gradient }}>
                  <span className="project-emoji">{project.emoji}</span>
                  {project.featured && <span className="featured-badge">Featured</span>}
                </div>

                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn btn-outline" data-cursor>
                      <FiGithub size={14} /> View Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
