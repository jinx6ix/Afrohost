import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { CheckCircle, X, ArrowRight, Server, Zap, Crown, Phone } from "lucide-react"
import Link from "next/link"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for personal websites and blogs",
      price: "$4.99",
      period: "per month",
      icon: Server,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      popular: false,
      features: [
        "1 Website",
        "10GB SSD Storage",
        "100GB Bandwidth",
        "Free SSL Certificate",
        "24/7 Support",
        "1-Click WordPress Install",
        "Email Accounts",
        "99.9% Uptime Guarantee",
      ],
      notIncluded: ["Free Domain", "Advanced Security", "Priority Support", "Staging Environment"],
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and portfolios",
      price: "$9.99",
      period: "per month",
      icon: Zap,
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
      popular: true,
      features: [
        "Unlimited Websites",
        "50GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Free Domain (1 Year)",
        "24/7 Priority Support",
        "Advanced Security Suite",
        "Daily Backups",
        "Staging Environment",
        "CDN Integration",
      ],
      notIncluded: ["Dedicated IP", "Advanced Developer Tools", "White-label Options"],
    },
    {
      name: "Enterprise",
      description: "Complete solution for large organizations",
      price: "$19.99",
      period: "per month",
      icon: Crown,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      popular: false,
      features: [
        "Unlimited Everything",
        "200GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Free Domain (1 Year)",
        "24/7 VIP Support",
        "Advanced Security Suite",
        "Daily Backups",
        "Staging Environment",
        "CDN Integration",
        "Dedicated IP",
        "Advanced Developer Tools",
        "White-label Options",
        "Performance Optimization",
      ],
      notIncluded: [],
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
            <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">Hosting Plans</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Choose Your Perfect
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Hosting Plan
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From personal blogs to enterprise applications, we have the right hosting solution for every need and
              budget.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <StaggerAnimation staggerDelay={0.2}>
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`bg-slate-900/50 border-slate-700 ${plan.borderColor} relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer ${
                      plan.popular ? "ring-2 ring-cyan-500/50 hover:ring-cyan-400" : "hover:shadow-cyan-500/20"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 animate-pulse">
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-8">
                      <div
                        className={`p-3 bg-gradient-to-r ${plan.color} rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <plan.icon className="h-8 w-8 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <CardTitle className="text-2xl text-white group-hover:text-cyan-400 transition-colors">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                      <div className="mt-6">
                        <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                          {plan.price}
                          <span className="text-lg text-gray-400">/{plan.period}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-4">What's included:</h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center group/item">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                              <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {plan.notIncluded.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-400 mb-4">Not included:</h4>
                          <ul className="space-y-3">
                            {plan.notIncluded.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center">
                                <X className="h-4 w-4 text-gray-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-500 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-6">
                        <Link href="/contact">
                          <Button
                            className={`w-full transition-all duration-300 hover:scale-105 ${
                              plan.popular
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25"
                                : "bg-slate-700 hover:bg-slate-600 text-white"
                            }`}
                          >
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Features Comparison */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Compare All Features
              </h2>
            </div>

            <Card className="bg-slate-900/50 border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-6 text-white">Features</th>
                      <th className="text-center p-6 text-white">Starter</th>
                      <th className="text-center p-6 text-white">Professional</th>
                      <th className="text-center p-6 text-white">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Websites", starter: "1", professional: "Unlimited", enterprise: "Unlimited" },
                      { feature: "Storage", starter: "10GB", professional: "50GB", enterprise: "200GB" },
                      { feature: "Bandwidth", starter: "100GB", professional: "Unlimited", enterprise: "Unlimited" },
                      { feature: "Free Domain", starter: "❌", professional: "✅", enterprise: "✅" },
                      { feature: "SSL Certificate", starter: "✅", professional: "✅", enterprise: "✅" },
                      { feature: "Email Accounts", starter: "✅", professional: "✅", enterprise: "✅" },
                      { feature: "24/7 Support", starter: "✅", professional: "Priority", enterprise: "VIP" },
                      { feature: "Daily Backups", starter: "❌", professional: "✅", enterprise: "✅" },
                      { feature: "CDN", starter: "❌", professional: "✅", enterprise: "✅" },
                      { feature: "Staging Environment", starter: "❌", professional: "✅", enterprise: "✅" },
                      { feature: "Dedicated IP", starter: "❌", professional: "❌", enterprise: "✅" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                        <td className="p-6 text-gray-300 font-medium">{row.feature}</td>
                        <td className="p-6 text-center text-gray-400">{row.starter}</td>
                        <td className="p-6 text-center text-gray-400">{row.professional}</td>
                        <td className="p-6 text-center text-gray-400">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>
      </ScrollAnimation>

      {/* FAQ Section */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    question: "Can I upgrade my plan anytime?",
                    answer:
                      "Yes! You can upgrade your hosting plan at any time. The upgrade takes effect immediately and you'll only pay the prorated difference.",
                  },
                  {
                    question: "Do you offer a money-back guarantee?",
                    answer:
                      "We offer a 30-day money-back guarantee on all hosting plans. If you're not satisfied, we'll refund your payment in full.",
                  },
                  {
                    question: "Is there a setup fee?",
                    answer:
                      "No setup fees! All our hosting plans come with free setup and migration assistance from our expert team.",
                  },
                  {
                    question: "What's included in 24/7 support?",
                    answer:
                      "Our support team is available via live chat, email, and phone 24/7/365. Professional and Enterprise plans get priority support.",
                  },
                ].map((faq, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3 hover:text-cyan-400 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-gray-400">{faq.answer}</p>
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
                  Join thousands of satisfied customers and experience the difference of premium hosting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-all duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Sales: (555) 123-4567
                  </Button>
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
