import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { CheckCircle } from "lucide-react"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function CloudHostingPage() {
  const plans = [
    {
      name: "Cloud Starter",
      price: "$14.99",
      period: "/month",
      features: ["2 CPU Cores", "4GB RAM", "50GB SSD Storage", "Auto-scaling", "Load Balancing", "24/7 Support"],
      popular: false,
    },
    {
      name: "Cloud Business",
      price: "$29.99",
      period: "/month",
      features: [
        "4 CPU Cores",
        "8GB RAM",
        "100GB SSD Storage",
        "Auto-scaling",
        "Advanced Load Balancing",
        "24/7 Priority Support",
      ],
      popular: true,
    },
    {
      name: "Cloud Enterprise",
      price: "$59.99",
      period: "/month",
      features: [
        "8 CPU Cores",
        "16GB RAM",
        "200GB SSD Storage",
        "Auto-scaling",
        "Enterprise Load Balancing",
        "24/7 VIP Support",
      ],
      popular: false,
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
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Cloud Hosting</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Scalable Cloud
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Hosting Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flexible and scalable cloud infrastructure that grows with your business.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <StaggerAnimation>
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`bg-slate-900/50 border-slate-700 transform transition-all duration-500 hover:scale-105 hover:shadow-xl group cursor-pointer ${
                      plan.popular ? "ring-2 ring-cyan-500/50" : "hover:shadow-cyan-500/20"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold text-cyan-400 mt-4">
                        {plan.price}
                        <span className="text-lg text-gray-400">{plan.period}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                            : "bg-slate-700 hover:bg-slate-600"
                        }`}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  )
}
