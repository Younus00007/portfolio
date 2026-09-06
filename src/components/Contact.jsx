import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FiMail, FiSend, FiCopy, FiCheck, FiMapPin, 
  FiClock, FiExternalLink, FiMessageSquare, FiUser,
  FiGithub, FiLinkedin
} from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { soundFx } from '../utils/SoundEffects'
import './Contact.css'

const promptChips = [
  '👋 Full-Time Role Opportunity',
  '🚀 High-Performance Backend Project',
  '🤖 GenAI / LLM Integration',
  '☕ Let’s grab a virtual coffee'
]

export default function Contact({ showToast }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const email = 'younustheman@gmail.com'

  const handleCopyEmail = () => {
    soundFx.playChime()
    navigator.clipboard.writeText(email)
    setCopied(true)
    if (showToast) showToast('Email copied to clipboard! ✓')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChipClick = (chip) => {
    soundFx.playClick()
    setFormData(prev => ({
      ...prev,
      subject: chip,
      message: prev.message ? prev.message : `Hi Younus, I'd love to connect regarding ${chip.replace(/^[^\w]+/, '')}.`
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      if (showToast) showToast('Please fill out all required fields')
      return
    }

    soundFx.playClick()
    setSending(true)

    // Construct mailto link fallback for instant delivery
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      soundFx.playChime()
      if (showToast) showToast('Message queued! Opening email client...')
      window.location.href = mailtoUrl

      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 4000)
    }, 1200)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-ambient-glow" />

      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section Header */}
          <div className="section-header">
            <div className="section-tag">Let's Build Together</div>
            <h2 className="section-title">
              Ready to <span className="gradient-text">scale your mission?</span>
            </h2>
            <p className="section-subtitle">
              Whether you have an exciting full-time opportunity, an engineering challenge, 
              or just want to discuss algorithms and GenAI, my inbox is always open.
            </p>
          </div>

          <div className="contact-grid-layout">
            {/* Left Column: Direct Info & Social Cards */}
            <div className="contact-info-col">
              {/* Primary Email Card */}
              <div className="contact-card glass-card spotlight-card" data-cursor>
                <div className="contact-card-top">
                  <div className="contact-icon-pill">
                    <FiMail />
                  </div>
                  <span className="contact-status-badge">
                    <span className="contact-status-beacon" /> Quick Response (&lt; 24 hrs)
                  </span>
                </div>

                <div className="contact-card-text">
                  <span className="contact-label">DIRECT INQUIRIES</span>
                  <h3 className="contact-val">{email}</h3>
                </div>

                <div className="contact-actions-row">
                  <button 
                    className="btn-glow contact-copy-btn" 
                    onClick={handleCopyEmail}
                    data-cursor
                  >
                    {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                    <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
                  </button>

                  <a 
                    href={`mailto:${email}`} 
                    className="btn-outline contact-mail-btn"
                    onClick={() => soundFx.playClick()}
                    data-cursor
                  >
                    <FiExternalLink size={15} />
                    <span>Open Mail Client</span>
                  </a>
                </div>
              </div>

              {/* Location & Availability Widget */}
              <div className="contact-meta-row">
                <div className="contact-meta-card glass-card spotlight-card">
                  <FiMapPin className="meta-icon" />
                  <div>
                    <span className="meta-title">Location</span>
                    <span className="meta-desc">Tamil Nadu, India 🇮🇳</span>
                  </div>
                </div>

                <div className="contact-meta-card glass-card spotlight-card">
                  <FiClock className="meta-icon" />
                  <div>
                    <span className="meta-title">Timezone</span>
                    <span className="meta-desc">IST (UTC +5:30)</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Network */}
              <div className="contact-social-grid">
                {[
                  {
                    name: 'GitHub',
                    handle: '@Younus00007',
                    icon: <FiGithub />,
                    href: 'https://github.com/Younus00007',
                    accent: '#ffffff'
                  },
                  {
                    name: 'LinkedIn',
                    handle: 'in/younuscse',
                    icon: <FiLinkedin />,
                    href: 'https://www.linkedin.com/in/younuscse/',
                    accent: '#0a66c2'
                  },
                  {
                    name: 'LeetCode',
                    handle: '600+ Solved',
                    icon: <SiLeetcode />,
                    href: 'https://leetcode.com/u/Younus07/',
                    accent: '#f59e0b'
                  }
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-net-card glass-card spotlight-card"
                    onClick={() => soundFx.playClick()}
                    data-cursor
                  >
                    <div className="social-net-icon" style={{ color: s.accent }}>
                      {s.icon}
                    </div>
                    <div className="social-net-info">
                      <span className="social-net-name">{s.name}</span>
                      <span className="social-net-handle">{s.handle}</span>
                    </div>
                    <FiExternalLink className="social-net-arrow" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="contact-form-col">
              <form className="contact-form-card glass-card spotlight-card" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3 className="form-title">Send a Direct Message</h3>
                  <span className="form-subtitle">Fill out this quick form to initiate contact</span>
                </div>

                {/* Quick Topic Chips */}
                <div className="prompt-chips-wrapper">
                  <span className="chips-label">Quick topics:</span>
                  <div className="chips-row">
                    {promptChips.map(chip => (
                      <button
                        key={chip}
                        type="button"
                        className="prompt-chip"
                        onClick={() => handleChipClick(chip)}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="form-fields-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Your Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="e.g. Full-Stack Software Engineer Position"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project, team, or opportunity..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={sending || submitted}
                  className={`btn-glow form-submit-btn ${submitted ? 'submitted' : ''}`}
                  data-cursor
                >
                  {submitted ? (
                    <>
                      <FiCheck size={18} />
                      <span>Message Dispatched!</span>
                    </>
                  ) : sending ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <FiSend size={16} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
