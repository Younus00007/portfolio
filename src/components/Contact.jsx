import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiCheckCircle } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import sampleImg from '../assets/sample.jpeg'
import './Contact.css'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.')
      return
    }
    setSending(true)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Portfolio Message",
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSent(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setError("Failed to send message. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
    }

    setSending(false)
    setTimeout(() => setSent(false), 5000)
  }

  const socials = [
    { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Younus00007' },
    { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/younuscse/' },
    { icon: <SiLeetcode />, label: 'LeetCode', href: 'https://leetcode.com/u/Younus07/' },
    { icon: <FiMail />, label: 'Email', href: 'mailto:younustheman@gmail.com' },
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="contact-orb-1" />
      <div className="contact-orb-2" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header" style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <div className="section-tag">Contact</div>
            <h2 className="section-title">
              Let's <span className="gradient-text">work together</span>
            </h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              Have a project in mind or want to chat? My inbox is always open.
            </p>
          </div>

          <div className="contact-grid">
            {/* Info panel */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div 
                className="info-card glass-card" 
                style={{ 
                  padding: 0, 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative',
                  minHeight: '480px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}
              >
                {/* Background Image Layer */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                  <img 
                    src={sampleImg} 
                    alt="Muhammad Younus A" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: 'center 8%', 
                      filter: 'contrast(1.1) brightness(0.9) grayscale(20%)' 
                    }} 
                  />
                  {/* Deep gradient overlay to ensure text is perfectly readable */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.85) 35%, transparent 100%)', pointerEvents: 'none' }} />
                </div>
                
                {/* Content Overlay */}
                <div style={{ padding: '2.5rem 2rem', position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.8rem', color: '#fff' }}>Get in touch</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                    I'm currently open to freelance opportunities. If you have an interesting project or just want to say hi, drop me a message!
                  </p>

                  <div className="contact-details" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                    <div className="contact-detail" style={{ color: '#fff' }}>
                      <FiMail className="detail-icon" style={{ background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '50%', color: 'var(--accent-cyan)', width: '38px', height: '38px' }} />
                      <span>younustheman@gmail.com</span>
                    </div>
                    <div className="contact-detail" style={{ color: '#fff' }}>
                      <FiMapPin className="detail-icon" style={{ background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '50%', color: 'var(--accent-purple)', width: '38px', height: '38px' }} />
                      <span>India</span>
                    </div>
                  </div>

                  <div className="contact-socials" style={{ display: 'flex', gap: '0.8rem' }}>
                    {socials.map(({ icon, label, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" 
                         className="contact-social-link social-link"
                         style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} 
                         data-cursor title={label}>
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name <span className="required">*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, collaboration..."
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="form-input form-textarea"
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className={`btn-glow submit-btn ${sending ? 'sending' : ''}`} disabled={sending} data-cursor>
                  {sent ? (
                    <><FiCheckCircle /> Message Sent!</>
                  ) : sending ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    <><FiSend /> Send Message</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
