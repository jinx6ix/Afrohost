import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Shield, TrendingUp, Users, Clock, CheckCircle, ArrowRight, Building, DollarSign, Zap } from "lucide-react"
import Link from "next/link"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Global Financial Institution",
      industry: "Financial Services",
      challenge: "Protecting customer data and preventing fraud in real-time across 50+ countries",
      solution: "Implemented AI-powered threat detection and 24/7 monitoring with custom fraud prevention algorithms",
      results: [
        "99.8% reduction in successful cyber attacks",
        "$50M+ in prevented fraud losses annually",
        "Zero data breaches in 3 years",
        "Compliance with global financial regulations",
      ],
      metrics: {
        threats: "10M+",
        uptime: "99.99%",
        response: "< 30 sec",
        savings: "$50M+",
      },
      icon: Building,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      title: "Healthcare Network",
      industry: "Healthcare",
      challenge: "Securing patient data across 200+ hospitals while maintaining HIPAA compliance",
      solution: "Deployed comprehensive data protection, network security, and compliance monitoring solutions",
      results: [
        "100% HIPAA compliance maintained",
        "Zero patient data breaches",
        "50% reduction in security incidents",
        "Streamlined compliance reporting",
      ],
      metrics: {
        threats: "5M+",
        uptime: "99.95%",
        response: "< 45 sec",
        savings: "$25M+",
      },
      icon: Shield,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      title: "E-commerce Platform",
      industry: "Retail Technology",
      challenge: "Protecting customer payment data and preventing DDoS attacks during peak shopping seasons",
      solution: "Implemented cloud security, payment protection, and scalable DDoS mitigation",
      results: [
        "Zero payment data breaches",
        "99.9% uptime during Black Friday",
        "75% reduction in false fraud alerts",
        "PCI DSS Level 1 compliance achieved",
      ],
      metrics: {
        threats: "15M+",
        uptime: "99.9%",
        response: "< 15 sec",
        savings: "$75M+",
      },
      icon: DollarSign,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Manufacturing Corporation",
      industry: "Industrial Manufacturing",
      challenge: "Securing IoT devices and industrial control systems from cyber threats",
      solution: "Deployed IoT security, network segmentation, and industrial cybersecurity solutions",
      results: [
        "100% IoT device visibility and protection",
        "Zero production downtime from cyber incidents",
        "90% reduction in security alerts",
        "Enhanced operational technology security",
      ],
      metrics: {
        threats: "2M+",
        uptime: "99.98%",
        response: "< 60 sec",
        savings: "$30M+",
      },
      icon: Zap,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
    },
  ]

  const successMetrics = [
    { label: "Threats Blocked", value: "32M+", icon: Shield },
    { label: "Clients Protected", value: "500+", icon: Users },
    { label: "Average Response Time", value: "< 30s", icon: Clock },
    { label: "Cost Savings Generated", value: "$180M+", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">Success Stories</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Real Results for
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Real Businesses
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how CyberShield has helped organizations across industries strengthen their cybersecurity posture
              and protect their digital assets.
            </p>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <StaggerAnimation>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                {successMetrics.map((metric, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform hover:scale-105 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <metric.icon className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-gray-400 text-sm">{metric.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Case Studies */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {caseStudies.map((study, index) => (
                <ScrollAnimation key={index} animation="scale" delay={index * 0.2}>
                  <Card key={index} className={`bg-slate-900/50 border-slate-700 overflow-hidden ${study.borderColor}`}>
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 p-8">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`p-3 bg-gradient-to-r ${study.color} rounded-lg`}>
                            <study.icon className="h-8 w-8 text-cyan-400" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white">{study.title}</h2>
                            <Badge className="mt-2 bg-slate-700 text-gray-300">{study.industry}</Badge>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Challenge</h3>
                            <p className="text-gray-300">{study.challenge}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Solution</h3>
                            <p className="text-gray-300">{study.solution}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Results</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {study.results.map((result, resultIndex) => (
                                <div key={resultIndex} className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{result}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`p-8 bg-gradient-to-br ${study.color}`}>
                        <h3 className="text-xl font-semibold text-white mb-6">Key Metrics</h3>
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400 mb-1">{study.metrics.threats}</div>
                            <div className="text-sm text-gray-300">Threats Blocked</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">{study.metrics.uptime}</div>
                            <div className="text-sm text-gray-300">Uptime Achieved</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400 mb-1">{study.metrics.response}</div>
                            <div className="text-sm text-gray-300">Response Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400 mb-1">{study.metrics.savings}</div>
                            <div className="text-sm text-gray-300">Cost Savings</div>
                          </div>
                        </div>

                        <div className="mt-8">
                          <Link href="/contact">
                            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                              Get Similar Results
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Testimonials */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "CyberShield's threat detection system saved us from what could have been a catastrophic breach. Their AI-powered solutions are truly next-generation.",
                author: "Sarah Johnson",
                role: "CISO, Global Financial Corp",
                company: "Fortune 500 Financial Institution",
              },
              {
                quote:
                  "The 24/7 monitoring gives us complete peace of mind. We've seen a 99% reduction in security incidents since partnering with CyberShield.",
                author: "Michael Chen",
                role: "IT Director, HealthTech Solutions",
                company: "Healthcare Technology Provider",
              },
              {
                quote:
                  "Their incident response team is exceptional. When we had a security event, they contained it within minutes and prevented any data loss.",
                author: "Emily Rodriguez",
                role: "Security Manager, RetailMax",
                company: "E-commerce Platform",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-cyan-400">{testimonial.role}</div>
                    <div className="text-xs text-gray-400 mt-1">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let us help you achieve similar results. Get a free security assessment and discover how we can protect
                your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    Start Your Success Story
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
