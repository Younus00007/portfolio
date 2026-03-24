import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiServer, FiCloud, FiSmartphone } from 'react-icons/fi'
import profilePic from '../assets/profile_pic.png'
import './About.css'

const cards = [
  { icon: <FiCode />, title: 'Frontend', desc: 'Pixel-perfect UIs that feel alive and responsive across all devices.' },
  { icon: <FiServer />, title: 'Backend', desc: 'Scalable APIs and microservices engineered for performance.' },
  { icon: <FiCloud />, title: 'Cloud & DevOps', desc: 'CI/CD pipelines, containerization, and cloud-native deployments.' },
  { icon: <FiSmartphone />, title: 'Mobile', desc: 'Cross-platform mobile apps with React Native.' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="about-section">
      <div className="about-orb" />

      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div className="section-header" variants={itemVariants}>
            <div className="section-tag">About Me</div>
            <h2 className="section-title">
              Crafting{' '}
              <span className="gradient-text">digital magic</span>,<br />
              one line at a time
            </h2>
          </motion.div>

          <div className="about-grid">
            {/* Bio */}
            <motion.div className="about-bio" variants={itemVariants}>
              <div className="bio-card glass-card">
                <div className="bio-avatar">
                  <div className="avatar-ring" />
                  <div className="avatar-image-wrapper">
                    <img src={profilePic} alt="Muhammad Younus A" className="avatar-image" />
                  </div>
                </div>
                <div className="bio-text">
                  <p>
                    I'm a passionate <strong>Full-Stack Developer</strong> and GenAI enthusiast. As a fresh graduate in Computer Science and Engineering, I love the intersection of design, engineering, and artificial intelligence.
                  </p>
                  <p>
                    My primary focus is on backend development, where I enjoy architecting robust APIs and integrating intelligent AI models using tools like LangChain and Spring Boot. I have a strong foundation in problem-solving, having solved over 600 problems on LeetCode.
                  </p>
                  <div className="bio-tags">
                    {['Java', 'Python', 'Spring Boot', 'React', 'LangChain', 'Node.js'].map(tag => (
                      <span key={tag} className="bio-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code block easter egg */}
              <div className="code-block glass-card">
                <div className="code-header">
                  <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                  <span className="code-filename">about.js</span>
                </div>
                <pre className="code-content"><code>{`const developer = {
  name: "Muhammad Younus A",
  role: "Full-Stack Engineer",
  education: "BE CSE @ Nanda Engineering College",
  passions: [
    "Backend Arch",
    "GenAI Apps",
    "Problem Solving",
    "Clean Code"
  ],
  available: true
}`}</code></pre>
              </div>
            </motion.div>

            {/* Specialisation cards */}
            <motion.div className="about-cards" variants={containerVariants}>
              {cards.map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  className="about-card glass-card"
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="card-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
