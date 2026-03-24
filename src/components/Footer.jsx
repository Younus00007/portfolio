import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <Link to="hero" smooth duration={50} className="footer-logo" data-cursor>
            <span style={{ color: 'var(--accent-cyan)', opacity: 0.7 }}>&lt;</span>
            <span className="gradient-text">MY</span>
            <span style={{ color: 'var(--accent-cyan)', opacity: 0.7 }}>/&gt;</span>
          </Link>

          <p className="footer-tagline">
            Building the web, one component at a time.
          </p>

          <div className="footer-socials">
            {[
              { icon: <FiGithub />, href: 'https://github.com', label: 'GitHub' },
              { icon: <FiLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link footer-social" data-cursor title={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {year} <span className="gradient-text">Muhammad Younus A</span>. Crafted with ♥ and too much coffee.
          </p>

          <motion.button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            data-cursor
          >
            <FiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
