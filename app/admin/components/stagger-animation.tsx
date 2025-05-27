"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface StaggerAnimationProps {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export default function StaggerAnimation({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
}: StaggerAnimationProps) {
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

  useEffect(() => {
    if (isVisible && ref.current) {
      const childElements = ref.current.children
      Array.from(childElements).forEach((child, index) => {
        const element = child as HTMLElement
        setTimeout(
          () => {
            element.style.opacity = "1"
            element.style.transform = "translateY(0)"
          },
          index * staggerDelay * 1000,
        )
      })
    }
  }, [isVisible, staggerDelay])

  return (
    <div ref={ref} className={`stagger-container ${className}`}>
      <style jsx>{`
        .stagger-container > * {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
      `}</style>
      {children}
    </div>
  )
}
