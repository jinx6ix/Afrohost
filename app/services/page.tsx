import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  Shield,
  Lock,
  Eye,
  Wifi,
  Database,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Server,
  Users,
} from "lucide-react"
import Link from "next/link"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function ServicesPage() {
  const services = [
    {
      id: "threat-detection",
      icon: Shield,
      title: "Advanced Threat Detection",
      description:
        "AI-powered threat detection that identifies and neutralizes risks before they impact your business.",
      features: [
        "Real-time monitoring and analysis",
        "Machine learning algorithms",
        "Automated threat response",
        "Behavioral analytics",
        "Zero-day threat protection",
        "Custom threat intelligence",
      ],
      benefits: [
        "99.9% threat detection accuracy",
        "Reduce false positives by 90%",
        "Average response time under 30 seconds",
        "24/7 automated monitoring",
      ],
    },
    {
      id: "data-protection",
      icon: Lock,
      title: "Data Protection & Encryption",
      description: "Enterprise-grade encryption and data loss prevention to keep your sensitive information secure.",
      features: [
        "End-to-end encryption",
        "Data loss prevention (DLP)",
        "Access controls and permissions",
        "Compliance management",
        "Data classification",
        "Secure file sharing",
      ],
      benefits: [
        "Military-grade encryption standards",
        "Compliance with GDPR, HIPAA, SOX",
        "Prevent data breaches",
        "Secure remote work capabilities",
      ],
    },
    {
      id: "security-monitoring",
      icon: Eye,
      title: "24/7 Security Monitoring",
      description:
        "Round-the-clock security operations center monitoring your infrastructure for suspicious activities.",
      features: [
        "24/7 SOC monitoring",
        "Incident response team",
        "Forensic analysis",
        "Threat hunting",
        "Security event correlation",
        "Custom dashboards and reporting",
      ],
      benefits: [
        "Immediate threat response",
        "Expert security analysts",
        "Comprehensive incident reports",
        "Proactive threat hunting",
      ],
    },
    {
      id: "network-security",
      icon: Wifi,
      title: "Network Security",
      description: "Comprehensive network protection including firewalls, intrusion detection, and VPN solutions.",
      features: [
        "Next-generation firewalls",
        "Intrusion detection/prevention",
        "VPN and secure remote access",
        "Network segmentation",
        "Traffic analysis",
        "Wireless security",
      ],
      benefits: [
        "Block 99.9% of network attacks",
        "Secure remote workforce",
        "Network visibility and control",
        "Compliance with security standards",
      ],
    },
    {
      id: "cloud-security",
      icon: Database,
      title: "Cloud Security",
      description: "Secure your cloud infrastructure with our comprehensive cloud security solutions.",
      features: [
        "Cloud configuration management",
        "Container security",
        "Multi-cloud support",
        "Cloud access security broker",
        "Identity and access management",
        "Cloud workload protection",
      ],
      benefits: ["Secure cloud migration", "Compliance in the cloud", "Cost-effective security", "Scalable protection"],
    },
    {
      id: "incident-response",
      icon: AlertTriangle,
      title: "Incident Response",
      description: "Rapid incident response and recovery services to minimize downtime and damage.",
      features: [
        "Emergency response team",
        "Forensic investigation",
        "Recovery planning",
        "Business continuity",
        "Legal and compliance support",
        "Post-incident analysis",
      ],
      benefits: [
        "Minimize business impact",
        "Expert incident handling",
        "Regulatory compliance",
        "Lessons learned and improvement",
      ],
    },
  ]

  const additionalServices = [
    {
      icon: Users,
      title: "Security Training",
      description: "Comprehensive cybersecurity training for your team to build a security-aware culture.",
    },
    {
      icon: Globe,
      title: "Compliance Management",
      description: "Ensure your organization meets all regulatory requirements and industry standards.",
    },
    {
      icon: Server,
      title: "Vulnerability Assessment",
      description: "Regular security assessments to identify and remediate vulnerabilities.",
    },
    {
      icon: Zap,
      title: "Penetration Testing",
      description: "Ethical hacking services to test your defenses and identify weaknesses.",
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
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">Our Services</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Comprehensive
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Security Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From threat detection to incident response, we provide end-to-end cybersecurity services that protect your
              business from evolving cyber threats.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {services.map((service, index) => (
                <ScrollAnimation key={service.id} animation={index % 2 === 0 ? "left" : "right"} delay={0.2}>
                  <div id={service.id} className="scroll-mt-32">
                    <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
                      <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                        <div className={`p-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                              <service.icon className="h-8 w-8 text-cyan-400" />
                            </div>
                            <div>
                              <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                              <p className="text-gray-400 mt-2">{service.description}</p>
                            </div>
                          </div>

                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {service.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Link href="/contact">
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                              Learn More
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                        </div>

                        <div
                          className={`p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                        >
                          <h3 className="text-xl font-semibold text-white mb-6">Benefits & Results</h3>
                          <div className="space-y-4">
                            {service.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-gray-300">{benefit}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-cyan-400 mb-2">99.9%</div>
                              <div className="text-sm text-gray-400">Success Rate</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Additional Services */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">Additional Services</Badge>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Complete Security Ecosystem
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {additionalServices.map((service, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <CardContent className="p-6">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mx-auto mb-4">
                        <service.icon className="h-8 w-8 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Secure Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get a free security assessment and discover which services are right for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    Get Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                    View Pricing
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
