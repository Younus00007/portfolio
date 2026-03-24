import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiBook } from 'react-icons/fi'
import shieldImg from '../assets/shield.png'
import './Experience.css'

const education = [
  {
    type: 'edu',
    role: 'B.E. Computer Science and Engineering',
    company: 'Nanda Engineering College',
    period: 'Completed',
    desc: 'Graduated with strong fundamentals in computer science, software engineering principles, algorithms, and data structures.',
    tech: ['Data Structures', 'Algorithms', 'Software Engineering'],
  }
]

const certifications = [
  {
    type: 'cert',
    role: 'Java Certification',
    company: 'Sun Java @ CSC Academy',
    period: 'Achieved',
    desc: 'Professional certification demonstrating strong proficiency and core understanding of the Java programming language.',
    tech: ['Java', 'OOP', 'Core Concepts'],
  },
  {
    type: 'cert',
    role: 'Problem Solving Expert',
    company: 'LeetCode',
    period: 'Ongoing',
    desc: 'Solved over 600 complex algorithmic problems, demonstrating a deep understanding of data structures and optimization techniques.',
    tech: ['Problem Solving', 'Algorithms', 'Optimization'],
  },
  {
    type: 'cert',
    role: '2nd Prize Winner - GenAI',
    company: 'Garuda (College Level Hackathon)',
    period: 'Recent',
    desc: 'Secured 2nd place by architecting and pitching an innovative Generative AI integration under tight competitive timelines.',
    tech: ['GenAI', 'Innovation', 'Hackathon'],
    image: shieldImg,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } },
}

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const isLeft = item.type === 'edu'

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="timeline-dot" />
      <div className="timeline-card glass-card">
        <div className="tl-header">
          <div>
            <h3 className="tl-role">{item.role}</h3>
            <p className="tl-company gradient-text">{item.company}</p>
          </div>
          <span className="tl-period">{item.period}</span>
        </div>
        <p className="tl-desc">{item.desc}</p>
        {item.image && (
          <div style={{ margin: '1.25rem 0', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={item.image} alt={item.role} style={{ maxWidth: '160px', width: '100%', height: 'auto', display: 'block', borderRadius: '8px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }} />
          </div>
        )}
        <div className="tl-tags">
          {item.tech.map(t => (
            <span key={t} className="tl-tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="experience" className="experience-section">
      <div className="exp-orb" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <div className="section-tag">Journey</div>
            <h2 className="section-title">
              My <span className="gradient-text">experience</span> & education
            </h2>
          </div>

          <div className="exp-columns">
            {/* Education */}
            <div>
              <div className="col-header">
                <FiBook className="col-icon edu-icon" />
                <h3>Education</h3>
              </div>
              <div className="timeline">
                {education.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="col-header">
                <FiBriefcase className="col-icon" />
                <h3>Certifications & Achievements</h3>
              </div>
              <div className="timeline">
                {certifications.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
