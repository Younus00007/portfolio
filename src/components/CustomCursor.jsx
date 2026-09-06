import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices / larger screens
    if (window.innerWidth < 768 || ('ontouchstart' in window)) return

    const dot = dotRef.current
    const ring = ringRef.current
    const canvas = canvasRef.current
    if (!dot || !ring || !canvas) return

    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = width / 2
    let mouseY = height / 2
    let ringX = width / 2
    let ringY = height / 2

    const particles = []
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#3b82f6', '#ffffff']

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Update global CSS variables for card spotlights
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`)

      // Move dot instantly
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      // Spawn stardust trailing particles occasionally
      if (Math.random() < 0.35) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          life: 1,
          size: Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }

      // Check hover target for contextual cursor
      const target = e.target.closest('a, button, [data-cursor], .project-card, .glass-card, input, textarea')
      if (target) {
        setIsHovered(true)
        if (target.closest('.project-card')) {
          setCursorText('VIEW')
        } else if (target.tagName === 'A' && target.getAttribute('target') === '_blank') {
          setCursorText('OPEN')
        } else {
          setCursorText('')
        }
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    const onMouseDown = () => setIsClicked(true)
    const onMouseUp = () => setIsClicked(false)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('resize', onResize)

    let raf
    const render = () => {
      // Smooth lerp ring toward mouse position
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`

      // Canvas particles animation
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.03

        if (p.life <= 0) {
          particles.splice(i, 1)
          i--
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life * 0.6
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div 
        ref={dotRef} 
        className={`cursor-dot ${isClicked ? 'clicked' : ''}`} 
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''} ${cursorText ? 'has-text' : ''}`}
      >
        {cursorText && <span className="cursor-label">{cursorText}</span>}
      </div>
    </>
  )
}
