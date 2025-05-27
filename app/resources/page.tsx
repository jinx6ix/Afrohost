import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  Download,
  FileText,
  Video,
  Headphones,
  Calendar,
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Zap,
  Users,
  BookOpen,
} from "lucide-react"
import Navigation from "../components/navigation"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function ResourcesPage() {
  const whitepapers = [
    {
      title: "The Complete Guide to Zero Trust Security",
      description:
        "A comprehensive 50-page guide covering zero trust principles, implementation strategies, and best practices.",
      pages: "50 pages",
      downloads: "2.3K",
      category: "Security Framework",
      icon: Shield,
    },
    {
      title: "Ransomware Defense Playbook 2024",
      description: "Essential strategies and tools for preventing, detecting, and responding to ransomware attacks.",
      pages: "35 pages",
      downloads: "1.8K",
      category: "Threat Prevention",
      icon: Lock,
    },
    {
      title: "Cloud Security Best Practices",
      description: "Expert guidance on securing cloud infrastructure across AWS, Azure, and Google Cloud platforms.",
      pages: "42 pages",
      downloads: "3.1K",
      category: "Cloud Security",
      icon: Eye,
    },
    {
      title: "AI in Cybersecurity: Opportunities and Risks",
      description: "Explore how AI is transforming cybersecurity and the new challenges it brings.",
      pages: "28 pages",
      downloads: "1.5K",
      category: "AI Security",
      icon: Zap,
    },
  ]

  const webinars = [
    {
      title: "Building a Security-First Culture",
      description: "Learn how to create a culture of security awareness across your organization.",
      duration: "45 min",
      date: "January 15, 2025",
      speaker: "Dr. Sarah Chen, CISO",
      type: "upcoming",
    },
    {
      title: "Advanced Threat Hunting Techniques",
      description: "Master proactive threat hunting methodologies and tools for early threat detection.",
      duration: "60 min",
      date: "December 20, 2024",
      speaker: "Michael Rodriguez, Security Analyst",
      type: "recorded",
    },
    {
      title: "Incident Response in the Cloud Era",
      description: "Adapt your incident response strategies for cloud-native environments.",
      duration: "50 min",
      date: "December 10, 2024",
      speaker: "Emily Johnson, IR Specialist",
      type: "recorded",
    },
  ]

  const tools = [
    {
      title: "Security Assessment Checklist",
      description: "Comprehensive checklist for evaluating your organization's security posture.",
      type: "PDF Checklist",
      icon: FileText,
    },
    {
      title: "Incident Response Template",
      description: "Ready-to-use incident response plan template with customizable workflows.",
      type: "Document Template",
      icon: FileText,
    },
    {
      title: "Risk Assessment Calculator",
      description: "Interactive tool to calculate and prioritize security risks in your environment.",
      type: "Online Tool",
      icon: Zap,
    },
    {
      title: "Compliance Mapping Guide",
      description: "Map your security controls to major compliance frameworks like SOC 2, ISO 27001.",
      type: "Reference Guide",
      icon: BookOpen,
    },
  ]

  const caseStudies = [
    {
      title: "Fortune 500 Financial Institution",
      description: "How we prevented $50M in fraud losses with AI-powered threat detection.",
      industry: "Financial Services",
      results: "99.8% threat detection accuracy",
    },
    {
      title: "Global Healthcare Network",
      description: "Achieving 100% HIPAA compliance across 200+ hospitals.",
      industry: "Healthcare",
      results: "Zero data breaches in 3 years",
    },
    {
      title: "E-commerce Platform",
      description: "Protecting customer data during peak shopping seasons.",
      industry: "Retail",
      results: "99.9% uptime during Black Friday",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30">Resource Center</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Security Knowledge
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                at Your Fingertips
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access our comprehensive library of cybersecurity resources, including whitepapers, webinars, tools, and
              case studies to enhance your security knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Whitepapers */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Expert Whitepapers
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                In-depth research and analysis from our cybersecurity experts
              </p>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whitepapers.map((paper, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{paper.category}</Badge>
                        <paper.icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                        {paper.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 mb-4">{paper.description}</CardDescription>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{paper.pages}</span>
                        <span>{paper.downloads} downloads</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Webinars */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Educational Webinars
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Learn from industry experts through our live and recorded webinar sessions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar, index) => (
              <Card
                key={index}
                className={`bg-slate-900/50 border-slate-700 ${
                  webinar.type === "upcoming" ? "border-green-500/30" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      className={
                        webinar.type === "upcoming"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }
                    >
                      {webinar.type === "upcoming" ? "Upcoming" : "Recorded"}
                    </Badge>
                    {webinar.type === "upcoming" ? (
                      <Calendar className="h-6 w-6 text-green-400" />
                    ) : (
                      <Video className="h-6 w-6 text-cyan-400" />
                    )}
                  </div>
                  <CardTitle className="text-white">{webinar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 mb-4">{webinar.description}</CardDescription>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {webinar.speaker}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {webinar.date}
                    </div>
                    <div className="flex items-center">
                      <Headphones className="h-4 w-4 mr-2" />
                      {webinar.duration}
                    </div>
                  </div>
                  <Button
                    className={`w-full ${
                      webinar.type === "upcoming"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    }`}
                  >
                    {webinar.type === "upcoming" ? "Register Now" : "Watch Recording"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Templates */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Security Tools & Templates
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Practical tools and templates to implement security best practices in your organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-700 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mx-auto mb-4">
                    <tool.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{tool.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                  <Badge className="mb-4 bg-slate-700 text-gray-300">{tool.type}</Badge>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Case Studies Preview
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how our solutions have helped organizations across various industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-slate-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <CardHeader>
                  <CardTitle className="text-white">{study.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 mb-4">{study.description}</CardDescription>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {study.industry}
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      {study.results}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
