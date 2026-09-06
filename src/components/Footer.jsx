import { FiArrowUp, FiHeart, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { ScrollLink, scrollToTop } from '../utils/scrollHelper'
import { soundFx } from '../utils/SoundEffects'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    soundFx.playClick()
    scrollToTop()
  }

  return (
    <footer className="site-footer">
      <div className="footer-glow-line" />

      <div className="container footer-container">
        <div className="footer-top-row">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="footer-bracket">&lt;</span>
              <span className="footer-brand-name">MY</span>
              <span className="footer-bracket">/&gt;</span>
              <span className="footer-brand-title">Muhammad Younus A</span>
            </div>
            <p className="footer-tagline">
              Engineering high-performance backend systems, GenAI architectures, and fluid digital experiences.
            </p>
            <div className="footer-status-pill">
              <span className="footer-beacon" />
              <span>Available for Full-time Roles & Impact</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="footer-links-col">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-nav-list">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
                <li key={item}>
                  <ScrollLink
                    to={item.toLowerCase()}
                    offset={-70}
                    className="footer-nav-link"
                    onClick={() => soundFx.playClick()}
                    data-cursor
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connect Col */}
          <div className="footer-social-col">
            <span className="footer-col-title">Connect</span>
            <div className="footer-social-icons">
              {[
                { icon: <FiGithub />, href: 'https://github.com/Younus00007', label: 'GitHub' },
                { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/younuscse/', label: 'LinkedIn' },
                { icon: <SiLeetcode />, href: 'https://leetcode.com/u/Younus07/', label: 'LeetCode' },
                { icon: <FiMail />, href: 'mailto:younustheman@gmail.com', label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  onClick={() => soundFx.playClick()}
                  data-cursor
                  data-tooltip={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <button 
              className="footer-back-top-btn glass-card"
              onClick={handleBackToTop}
              data-cursor
              title="Back to Top"
            >
              <FiArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom-row">
          <p className="footer-copy">
            © {currentYear} Muhammad Younus A. Designed & Engineered with precision.
          </p>
          <div className="footer-specs">
            <span>React 19</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>Three.js</span>
            <span>•</span>
            <span>Web Audio API</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
