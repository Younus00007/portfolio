import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(1)
    mount.appendChild(renderer.domElement)

    // Particles
    const count = 800
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const color1 = new THREE.Color('#a855f7')
    const color2 = new THREE.Color('#06b6d4')
    const color3 = new THREE.Color('#ec4899')

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      const t = Math.random()
      const c = t < 0.33 ? color1 : t < 0.66 ? color2 : color3
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Wireframe rotating icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.5, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: '#a855f7',
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    scene.add(ico)

    // Mouse parallax
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animate
    let raf
    let isVisible = true
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting
    })
    observer.observe(mount)

    const animate = () => {
      raf = requestAnimationFrame(animate)

      if (!isVisible) return

      const t = Date.now() * 0.0001

      particles.rotation.x = t * 0.3 + mouse.y * 0.15
      particles.rotation.y = t * 0.5 + mouse.x * 0.15

      ico.rotation.x = t * 0.5
      ico.rotation.y = t * 0.8

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.03

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      mount.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
