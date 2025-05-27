import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Server, Cloud, Zap, Crown, ArrowRight, CheckCircle, Users, Globe, Shield } from "lucide-react"
import Link from "next/link"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function HostingPage() {
  const hostingTypes = [
    {
      icon: Server,
      title: "Shared Hosting",
      description: "Perfect for beginners and small websites",
      price: "Starting at $4.99/month",
      features: [
        "Easy to use control panel",
        "One-click app installations",
        "Free SSL certificate",
        "24/7 customer support",
        "99.9% uptime guarantee",
      ],
      color: "from-blue-500/20 to-cyan-500/20",
      href: "/hosting/shared",
    },
    {
      icon: Zap,
      title: "VPS Hosting",
      description: "Scalable virtual private servers",
      price: "Starting at $19.99/month",
      features: [
        "Dedicated resources",
        "Root access and full control",
        "SSD storage included",
        "Multiple OS options",
        "Scalable configurations",
      ],
      color: "from-green-500/20 to-emerald-500/20",
      href: "/hosting/vps",
    },
    {
      icon: Crown,
      title: "Dedicated Servers",
      description: "Maximum performance and control",
      price: "Starting at $99.99/month",
      features: [
        "Entire server dedicated to you",
        "Maximum performance",
        "Complete administrative control",
        "Advanced security options",
        "24/7 monitoring included",
      ],
      color: "from-purple-500/20 to-pink-500/20",
      href: "/hosting/dedicated",
    },
    {
      icon: Cloud,
      title: "Cloud Hosting",
      description: "Flexible and scalable cloud infrastructure",
      price: "Starting at $14.99/month",
      features: [
        "Auto-scaling resources",
        "Pay for what you use",
        "High availability",
        "Global data centers",
        "Advanced load balancing",
      ],
      color: "from-cyan-500/20 to-blue-500/20",
      href: "/hosting/cloud",
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced security measures to protect your data and applications",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Worldwide data centers for optimal performance everywhere",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 support from hosting professionals",
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
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Hosting Solutions</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Choose Your Perfect
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Hosting Solution
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From shared hosting for beginners to dedicated servers for enterprises, we have the perfect hosting
              solution for every need and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Hosting Types */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <StaggerAnimation>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {hostingTypes.map((hosting, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer"
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`p-3 bg-gradient-to-r ${hosting.color} rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <hosting.icon className="h-8 w-8 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                        {hosting.title}
                      </CardTitle>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{hosting.description}</p>
                      <div className="text-2xl font-bold text-cyan-400 mt-4">{hosting.price}</div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {hosting.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center group/item">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                            <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Link href={hosting.href}>
                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Benefits Section */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why Choose HostPro Hosting?
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer"
                  >
                    <CardContent className="p-8">
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="h-8 w-8 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{benefit.description}</p>
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
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Choose the hosting solution that's right for you and start building your online presence today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                    >
                      View All Plans
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
