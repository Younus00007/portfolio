import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Skills.css'

const skillCategories = [
  {
    label: 'Backend',
    color: '#06b6d4',
    skills: [
      { name: 'Java / Python', level: 90 },
      { name: 'Spring Boot', level: 85 },
      { name: 'Node.js / Express', level: 88 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
  {
    label: 'Frontend',
    color: '#a855f7',
    skills: [
      { name: 'React', level: 85 },
      { name: 'JavaScript', level: 88 },
      { name: 'Tailwind CSS', level: 82 },
      { name: 'HTML / CSS', level: 90 },
    ],
  },
  {
    label: 'GenAI & Tools',
    color: '#ec4899',
    skills: [
      { name: 'LangChain / LangGraph', level: 82 },
      { name: 'Problem Solving (600+)', level: 95 },
      { name: 'Git / Docker', level: 80 },
      { name: 'Machine Learning Basics', level: 75 },
    ],
  },
]

const tech = [
  'Java', 'Python', 'Spring Boot', 'React', 'Node.js', 'Express',
  'LangChain', 'LangGraph', 'Git', 'Docker', 'PostgreSQL', 'TailwindCSS'
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

function SkillBar({ name, level, color, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="skills-section">
      <div className="skills-orb" />
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <div className="section-tag">Skills</div>
            <h2 className="section-title">
              My <span className="gradient-text">technical</span> arsenal
            </h2>
            <p className="section-subtitle">
              Technologies I've worked with across full-stack development, cloud, and beyond.
            </p>
          </motion.div>

          {/* Skill categories */}
          <div className="skills-grid">
            {skillCategories.map(({ label, color, skills }) => (
              <motion.div key={label} className="skill-category glass-card" variants={itemVariants}>
                <div className="category-header">
                  <div className="category-dot" style={{ background: color }} />
                  <h3 className="category-label">{label}</h3>
                </div>
                <div className="skill-bars">
                  {skills.map(({ name, level }, i) => (
                    <SkillBar key={name} name={name} level={level} color={color} delay={i * 0.1} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech marquee */}
          <motion.div className="tech-marquee-wrapper" variants={itemVariants}>
            <p className="marquee-label">Technologies I love working with</p>
            <div className="tech-marquee">
              <div className="marquee-track">
                {[...tech, ...tech].map((t, i) => (
                  <span key={i} className="marquee-tech">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
