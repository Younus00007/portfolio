import { useState, useEffect } from 'react'

export default function TypewriterText({ strings, speed = 70, deleteSpeed = 40, pause = 2000 }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!strings || strings.length === 0) return

    if (subIndex === strings[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pause)
      return () => clearTimeout(timeout)
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % strings.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [subIndex, index, isDeleting, strings, speed, deleteSpeed, pause])

  return (
    <span className="type-highlight gradient-text">
      {strings[index]?.substring(0, subIndex)}
      <span className="typewriter-blinking-cursor">|</span>
    </span>
  )
}
