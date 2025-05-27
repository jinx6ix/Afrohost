import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  Server,
  Zap,
  Shield,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  HardDrive,
  Wifi,
  Lock,
  Cpu,
  Database,
  Cloud,
  BarChart3,
  Headphones,
  Mail,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Experience blazing-fast loading times with our SSD storage and global CDN network.",
      features: [
        "SSD Storage for 10x faster data access",
        "Global CDN with 200+ edge locations",
        "HTTP/2 and HTTP/3 support",
        "Advanced caching mechanisms",
        "Optimized server configurations",
      ],
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Protect your website with enterprise-grade security features and monitoring.",
      features: [
        "Free SSL certificates with auto-renewal",
        "DDoS protection and mitigation",
        "Malware scanning and removal",
        "Web Application Firewall (WAF)",
        "Two-factor authentication",
      ],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Users,
      title: "24/7 Expert Support",
      description: "Get help when you need it from our team of hosting experts.",
      features: [
        "24/7/365 live chat support",
        "Phone support for urgent issues",
        "Email ticket system",
        "Comprehensive knowledge base",
        "Video tutorials and guides",
      ],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "Worldwide data centers ensure your site loads fast everywhere.",
      features: [
        "15+ data centers globally",
        "99.9% uptime guarantee",
        "Automatic failover protection",
        "Load balancing across servers",
        "Geographic redundancy",
      ],
      color: "from-purple-500/20 to-pink-500/20",
    },
  ]

  const technicalFeatures = [
    {
      icon: Cpu,
      title: "High-Performance Hardware",
      description: "Latest generation Intel Xeon processors with NVMe SSD storage",
    },
    {
      icon: Database,
      title: "Database Optimization",
      description: "Optimized MySQL and PostgreSQL with query caching",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless integration with AWS, Google Cloud, and Azure",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Detailed performance metrics and usage statistics",
    },
    {
      icon: Lock,
      title: "Backup & Recovery",
      description: "Automated daily backups with one-click restore",
    },
    {
      icon: Wifi,
      title: "CDN Integration",
      description: "Built-in content delivery network for global performance",
    },
  ]

  const supportChannels = [
    {
      icon: Headphones,
      title: "Live Chat",
      description: "Instant support via live chat",
      availability: "24/7",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed technical assistance",
      availability: "< 2 hours response",
    },
    {
      icon: Smartphone,
      title: "Phone Support",
      description: "Direct phone support for urgent issues",
      availability: "Business hours",
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
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">Features</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Your Success
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover all the features that make HostPro the perfect choice for your hosting needs. From performance to
              security, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {mainFeatures.map((feature, index) => (
                <ScrollAnimation key={index} animation={index % 2 === 0 ? "left" : "right"} delay={0.2}>
                  <Card className="bg-slate-900/50 border-slate-700 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-500">
                    <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                      <div className={`p-8 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg`}>
                            <feature.icon className="h-8 w-8 text-cyan-400" />
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-white">{feature.title}</h2>
                            <p className="text-gray-400 mt-2">{feature.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {feature.features.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center group">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                              <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8">
                          <Link href="/pricing">
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                              Get Started
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div
                        className={`p-8 bg-gradient-to-br ${feature.color} flex items-center justify-center ${
                          index % 2 === 1 ? "lg:col-start-1" : ""
                        }`}
                      >
                        <div className="text-center">
                          <feature.icon className="h-32 w-32 text-cyan-400 mx-auto mb-4 animate-pulse" />
                          <div className="text-xl font-semibold text-white">{feature.title}</div>
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

      {/* Technical Features */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">Technical Excellence</Badge>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Built on Cutting-Edge Technology
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {technicalFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="h-8 w-8 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Performance Metrics */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700">
              <CardContent className="p-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Performance That Speaks for Itself
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: Clock, label: "Average Load Time", value: "<200ms", color: "text-green-400" },
                    { icon: HardDrive, label: "SSD Performance", value: "10x Faster", color: "text-blue-400" },
                    { icon: Wifi, label: "Network Uptime", value: "99.99%", color: "text-purple-400" },
                    { icon: Server, label: "Server Response", value: "<50ms", color: "text-yellow-400" },
                  ].map((metric, index) => (
                    <div key={index} className="text-center group">
                      <div className="p-4 bg-slate-800 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto w-fit">
                        <metric.icon className={`h-8 w-8 ${metric.color} group-hover:animate-pulse`} />
                      </div>
                      <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                      <div className="text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollAnimation>

      {/* Support Features */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">Support Channels</Badge>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Get Help When You Need It
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-3 gap-8">
                {supportChannels.map((channel, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group cursor-pointer"
                  >
                    <CardHeader>
                      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <channel.icon className="h-8 w-8 text-purple-400 group-hover:animate-pulse" />
                      </div>
                      <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                        {channel.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                        {channel.description}
                      </p>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {channel.availability}
                      </Badge>
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
                  Experience These Features Today
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Ready to take advantage of all these powerful features? Start your hosting journey with HostPro.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                    >
                      View Pricing Plans
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-all duration-300"
                    >
                      Contact Sales
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
