"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "up" | "down" | "left" | "right" | "scale" | "fade"
  delay?: number
  duration?: number
  className?: string
}

export default function ScrollAnimation({
  children,
  animation = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all ease-out"
    const durationClass = `duration-${Math.round(duration * 1000)}`

    if (!isVisible) {
      switch (animation) {
        case "up":
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`
        case "down":
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`
        case "left":
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`
        case "right":
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`
        case "scale":
          return `${baseClasses} ${durationClass} opacity-0 scale-95`
        case "fade":
          return `${baseClasses} ${durationClass} opacity-0`
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`
      }
    }

    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  )
}
