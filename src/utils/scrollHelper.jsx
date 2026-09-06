export function scrollToSection(id, offset = -70) {
  const element = document.getElementById(id)
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function ScrollLink({ to, offset = -70, className = '', onClick, children, ...props }) {
  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) onClick(e)
    scrollToSection(to, offset)
  }

  return (
    <a href={`#${to}`} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
