import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth || window.innerWidth
    const height = mount.clientHeight || window.innerHeight || 800

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 4.5

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: "high-performance" 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    mount.appendChild(renderer.domElement)

    // Cosmic Particle Field
    const count = 1000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#a855f7'), // purple
      new THREE.Color('#06b6d4'), // cyan
      new THREE.Color('#ec4899'), // pink
      new THREE.Color('#3b82f6'), // blue
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Canvas circular particle texture for round, glowing dots
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(16, 16, 16, 0, Math.PI * 2)
    ctx.fill()
    const particleTexture = new THREE.CanvasTexture(canvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Futuristic Geometric Structures
    const group = new THREE.Group()

    // Outer Geodesic Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: '#a855f7',
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    group.add(ico)

    // Inner Torus Ring
    const torusGeo = new THREE.TorusGeometry(1.0, 0.02, 16, 100)
    const torusMat = new THREE.MeshBasicMaterial({
      color: '#06b6d4',
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.rotation.x = Math.PI / 4
    group.add(torus)

    // Center glowing core
    const coreGeo = new THREE.SphereGeometry(0.3, 16, 16)
    const coreMat = new THREE.MeshBasicMaterial({
      color: '#ec4899',
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    group.position.x = 2.2 // Offset to side behind content
    group.position.y = 0.2
    scene.add(group)

    // Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Resize Handler
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      
      // Adjust structure position on smaller screens
      if (window.innerWidth < 768) {
        group.position.x = 0
        group.position.y = -0.5
        group.scale.set(0.7, 0.7, 0.7)
      } else {
        group.position.x = 2.2
        group.position.y = 0.2
        group.scale.set(1, 1, 1)
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    // Visibility Observer for performance
    let isVisible = true
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(mount)

    // Animation Loop
    let raf
    let clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Particle subtle flow
      particles.rotation.y = elapsedTime * 0.04 + mouse.x * 0.1
      particles.rotation.x = elapsedTime * 0.02 + mouse.y * 0.1

      // Geometric rotations
      group.rotation.x = elapsedTime * 0.15 + mouse.y * 0.25
      group.rotation.y = elapsedTime * 0.25 + mouse.x * 0.25
      torus.rotation.z = elapsedTime * 0.3

      // Camera subtle parallax
      camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.04
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      particleGeo.dispose()
      particleMat.dispose()
      particleTexture.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      torusGeo.dispose()
      torusMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
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
        overflow: 'hidden'
      }}
    />
  )
}
