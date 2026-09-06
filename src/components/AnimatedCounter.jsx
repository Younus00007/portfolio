import { useState, useEffect } from 'react'

export default function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const endVal = parseInt(end, 10)
    if (isNaN(endVal)) return

    let startTime = null
    let animFrameId = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      // easeOutExpo formula
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(eased * endVal))

      if (progress < 1) {
        animFrameId = requestAnimationFrame(step)
      }
    }

    animFrameId = requestAnimationFrame(step)

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId)
    }
  }, [end, duration])

  return <>{count}</>
}
