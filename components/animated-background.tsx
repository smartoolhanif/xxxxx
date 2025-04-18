"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = this.getRandomColor()
        this.opacity = Math.random() * 0.5 + 0.1
      }

      getRandomColor() {
        const colors = ["#00ffcc", "#00ccff", "#00ff99", "#66ffcc"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Create gradient orbs
    const orbs = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        size: 300,
        color: "rgba(0, 204, 255, 0.1)",
        speedX: 0.2,
        speedY: 0.1,
        dirX: 1,
        dirY: 1,
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.7,
        size: 250,
        color: "rgba(0, 255, 204, 0.1)",
        speedX: 0.15,
        speedY: 0.25,
        dirX: -1,
        dirY: -1,
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
        size: 350,
        color: "rgba(0, 255, 153, 0.05)",
        speedX: 0.1,
        speedY: 0.2,
        dirX: 1,
        dirY: -1,
      },
    ]

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw orbs
      orbs.forEach((orb) => {
        // Update position
        orb.x += orb.speedX * orb.dirX
        orb.y += orb.speedY * orb.dirY

        // Bounce off edges
        if (orb.x > canvas.width - orb.size / 2 || orb.x < orb.size / 2) {
          orb.dirX *= -1
        }
        if (orb.y > canvas.height - orb.size / 2 || orb.y < orb.size / 2) {
          orb.dirY *= -1
        }

        // Draw orb
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size)
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "linear-gradient(to bottom, #041e2d, #062c3e, #073a4c)" }}
    />
  )
}
