import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Hide custom cursor on mobile devices
    if (window.innerWidth < 768) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const particles = []
    const colors = ['#06b6d4', '#a855f7', '#ec4899', '#ffffff'] // Theme neon colors
    
    // Track exact mouse position for the pointer
    const mouse = { x: width / 2, y: height / 2 }
    let lastX = width / 2
    let lastY = height / 2

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Spawn sparks based on drag distance so it tracks smoothly
      const spawnCount = Math.min(Math.floor(distance / 5) + 1, 6)
      
      for (let i = 0; i < spawnCount; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 + 0.5, // Slight downward gravity drift
          life: 1,
          size: Math.random() * 4 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      lastX = e.clientX
      lastY = e.clientY
    }

    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    let raf
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.025 // Faster fade out
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(p.size * p.life, 0), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.fill()
        
        if (p.life <= 0) {
          particles.splice(i, 1)
          i--
        }
      }

      // Render Primary Pointer (solid white dot)
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'white'
      ctx.globalAlpha = 1
      ctx.fill()
      
      // Render Pointer Outer Ring
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2)
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.3
      ctx.stroke()
      
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-canvas" />
}
