import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 transition-colors duration-300" />
      <div className="absolute inset-0 opacity-20 dark:opacity-20">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 dark:opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 transform rotate-45"
              style={{
                transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 1.5})`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
