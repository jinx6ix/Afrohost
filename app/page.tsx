"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  Server,
  Zap,
  Shield,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Quote,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import React from "react"

// 3D Server Component
function AnimatedServer() {
  const meshRef = useRef<any>()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main server body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Server lights */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-0.7, 1 - i * 0.3, 0.51]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#06b6d4" : "#10b981"}
            emissive={i % 2 === 0 ? "#06b6d4" : "#10b981"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Floating data particles */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={2 + Math.random() * 2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4]}>
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// 3D Scene Component
function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <AnimatedServer />
      </Float>

      {/* Background spheres */}
      <Sphere args={[1, 100, 200]} scale={20} position={[0, 0, -15]}>
        <MeshDistortMaterial
          color="#1e293b"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [clickedCard, setClickedCard] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCardClick = (index: number) => {
    setClickedCard(index)
    setTimeout(() => setClickedCard(null), 300)
  }

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "99.9% uptime with SSD storage and global CDN for maximum speed.",
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Shield,
      title: "Secure Hosting",
      description: "Advanced security features including SSL certificates and DDoS protection.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Expert support team available around the clock to help you succeed.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Worldwide data centers ensure your site loads fast everywhere.",
      color: "from-purple-500/20 to-pink-500/20",
    },
  ]

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee", icon: Clock },
    { number: "500K+", label: "Websites Hosted", icon: Globe },
    { number: "24/7", label: "Expert Support", icon: Users },
    { number: "15+", label: "Global Data Centers", icon: Server },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "HostPro has been incredible for our startup. The speed and reliability are unmatched!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Developer, WebCorp",
      content: "Best hosting service I've used. The support team is amazing and always helpful.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Blogger, LifeStyle",
      content: "My blog has never been faster. The migration was seamless and stress-free.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section with 3D Animation */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation animation="up">
            <div
              className="transform transition-transform duration-1000"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 animate-pulse">
                🚀 Premium Web Hosting Solutions
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-cyan-600 to-blue-600 dark:from-white dark:via-cyan-200 dark:to-blue-400 bg-clip-text text-transparent animate-fade-in">
                Host Your Dreams
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Power Your Success
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience lightning-fast hosting with 99.9% uptime, advanced security, and 24/7 expert support. Your
                website deserves the best infrastructure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/pricing">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transform hover:scale-105 transition-all duration-300"
                  >
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <StaggerAnimation>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className={`bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 text-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer backdrop-blur-sm ${
                      clickedCard === index ? "scale-95" : ""
                    }`}
                    onClick={() => handleCardClick(index)}
                  >
                    <CardContent className="p-6">
                      <stat.icon className="h-8 w-8 text-cyan-400 mx-auto mb-4 animate-bounce" />
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                      <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Features Section */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">Why Choose Us</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Powerful Features for Your Success
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Everything you need to build, grow, and scale your online presence
              </p>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer backdrop-blur-sm ${
                      clickedCard === index + 10 ? "scale-95 rotate-0" : ""
                    }`}
                    onClick={() => handleCardClick(index + 10)}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`p-4 bg-gradient-to-r ${feature.color} rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="h-8 w-8 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Hosting Plans Preview */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">Hosting Plans</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Choose Your Perfect Plan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From personal blogs to enterprise applications, we have the right solution for you
              </p>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    name: "Starter",
                    price: "$4.99",
                    period: "/month",
                    features: ["1 Website", "10GB SSD Storage", "Free SSL Certificate", "24/7 Support"],
                    popular: false,
                    icon: Server,
                  },
                  {
                    name: "Professional",
                    price: "$9.99",
                    period: "/month",
                    features: ["Unlimited Websites", "50GB SSD Storage", "Free Domain", "Advanced Security"],
                    popular: true,
                    icon: Zap,
                  },
                  {
                    name: "Enterprise",
                    price: "$19.99",
                    period: "/month",
                    features: [
                      "Unlimited Everything",
                      "200GB SSD Storage",
                      "Priority Support",
                      "Performance Optimization",
                    ],
                    popular: false,
                    icon: Globe,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer backdrop-blur-sm ${
                      plan.popular ? "ring-2 ring-cyan-500/50 hover:ring-cyan-400" : "hover:shadow-cyan-500/20"
                    } ${clickedCard === index + 20 ? "scale-95 translate-y-1" : ""}`}
                    onClick={() => handleCardClick(index + 20)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 animate-pulse">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-8">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <plan.icon className="h-8 w-8 text-cyan-400 group-hover:animate-spin" />
                      </div>
                      <CardTitle className="text-2xl text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                        {plan.name}
                      </CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                        <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full transition-all duration-300 ${
                          plan.popular
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105"
                            : "bg-slate-700 hover:bg-slate-600 hover:scale-105"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>

            <ScrollAnimation animation="scale">
              <div className="text-center">
                <Link href="/pricing">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                    View All Plans
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Testimonials */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">Customer Stories</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Loved by Thousands of Customers
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className={`bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-xl hover:shadow-purple-500/20 group cursor-pointer backdrop-blur-sm ${
                      clickedCard === index + 30 ? "scale-95 rotate-0" : ""
                    }`}
                    onClick={() => handleCardClick(index + 30)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current group-hover:animate-pulse" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-gray-700 dark:text-gray-300 mb-4 group-hover:text-white transition-colors">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Users className="h-6 w-6 text-cyan-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Performance Stats */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700 overflow-hidden backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-6">Performance That Speaks for Itself</h3>
                    <div className="space-y-6">
                      {[
                        { icon: Cpu, label: "CPU Performance", value: "99.9%", color: "text-green-400" },
                        { icon: HardDrive, label: "SSD Speed", value: "10x Faster", color: "text-blue-400" },
                        { icon: Wifi, label: "Network Uptime", value: "99.99%", color: "text-purple-400" },
                        { icon: Clock, label: "Load Time", value: "<200ms", color: "text-yellow-400" },
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center space-x-4 group">
                          <div className="p-2 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <metric.icon className={`h-6 w-6 ${metric.color} group-hover:animate-pulse`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold">{metric.label}</div>
                            <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Server className="h-24 w-24 text-cyan-400 mx-auto mb-4 animate-pulse" />
                        <div className="text-lg font-semibold text-white">Real-time Performance</div>
                        <div className="text-cyan-400">Monitoring 24/7</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollAnimation>

      {/* CTA Section */}
      <ScrollAnimation animation="scale">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 transform hover:scale-105 transition-all duration-500 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Ready to Launch Your Website?
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers and experience the difference of premium hosting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-all duration-300"
                    >
                      Talk to Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  )
}
