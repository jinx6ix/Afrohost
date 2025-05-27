import {Badge} from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Server, Users, Award, Globe, TrendingUp, Target, Eye, Zap, ArrowRight, Clock, Shield } from "lucide-react"
import Link from "next/link"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former tech executive with 15+ years in cloud infrastructure and hosting solutions.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Infrastructure architect specializing in scalable hosting platforms and performance optimization.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      bio: "Customer experience expert ensuring our clients achieve their online goals.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Security and reliability expert with expertise in enterprise hosting solutions.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: Server,
      title: "Reliability First",
      description: "We prioritize uptime and performance above all else, ensuring your website is always accessible.",
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Your success is our success. We're committed to helping you achieve your online goals.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously improving our infrastructure and services to stay ahead of the curve.",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Advanced security measures protect your data and ensure peace of mind.",
    },
  ]

  const milestones = [
    { year: "2015", event: "HostPro Founded", description: "Started with a vision to democratize premium hosting" },
    { year: "2017", event: "First Data Center", description: "Opened our flagship data center in San Francisco" },
    { year: "2019", event: "Global Expansion", description: "Expanded to 15 data centers across 6 continents" },
    { year: "2021", event: "100K Customers", description: "Reached 100,000 satisfied customers milestone" },
    { year: "2023", event: "AI Integration", description: "Launched AI-powered performance optimization" },
    { year: "2024", event: "500K Websites", description: "Now hosting over 500,000 websites globally" },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <ScrollAnimation animation="up">
        <section className="pt-32 pb-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">About HostPro</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Powering Dreams
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Since 2015
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From a small startup to a global hosting provider, we've been dedicated to delivering exceptional
                hosting experiences that help businesses and individuals succeed online.
              </p>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Mission & Vision */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="bg-slate-900/50 border-slate-700 transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                      <Target className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To democratize premium web hosting by making enterprise-grade infrastructure accessible to
                    businesses of all sizes. We believe every website deserves fast, secure, and reliable hosting.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700 transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                      <Eye className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To be the world's most trusted hosting provider, empowering millions of websites with cutting-edge
                    technology, unmatched performance, and exceptional customer support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Company Stats */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Impact in Numbers
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "500K+", label: "Websites Hosted", icon: Globe },
                  { number: "15+", label: "Global Data Centers", icon: Server },
                  { number: "99.9%", label: "Uptime Achieved", icon: TrendingUp },
                  { number: "24/7", label: "Expert Support", icon: Clock },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <stat.icon className="h-8 w-8 text-cyan-400 mx-auto mb-4 animate-pulse" />
                      <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Timeline */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">Our Journey</Badge>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Milestones & Achievements
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500"></div>

              <StaggerAnimation>
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                        <Card className="bg-slate-900/50 border-slate-700 transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20">
                          <CardContent className="p-6">
                            <div className="text-2xl font-bold text-cyan-400 mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-semibold text-white mb-2">{milestone.event}</h3>
                            <p className="text-gray-400">{milestone.description}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="relative z-10">
                        <div className="w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-950"></div>
                      </div>

                      <div className="w-1/2"></div>
                    </div>
                  ))}
                </div>
              </StaggerAnimation>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Our Values */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">Our Values</Badge>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                What Drives Us Forward
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="h-8 w-8 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Leadership Team */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">Leadership Team</Badge>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Meet Our Experts
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our leadership team brings decades of combined experience in hosting, infrastructure, and customer
                success
              </p>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-12 w-12 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-cyan-400 mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Awards & Certifications */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Awards & Certifications
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                {[
                  "Best Web Host 2024",
                  "ISO 27001 Certified",
                  "99.9% Uptime Award",
                  "Customer Choice 2024",
                  "Green Hosting Leader",
                ].map((cert, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-xl hover:shadow-yellow-500/20 cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <Award className="h-8 w-8 text-yellow-400 mx-auto mb-4 animate-pulse" />
                      <div className="text-white font-semibold text-sm">{cert}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* CTA Section */}
      <ScrollAnimation animation="scale">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Join Our Success Story
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Ready to experience the HostPro difference? Join thousands of satisfied customers today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                    >
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-all duration-300"
                    >
                      Contact Our Team
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
