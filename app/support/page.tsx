"use client"

import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Mail, Phone, MessageCircle, Search, ArrowRight, Clock, Users, HelpCircle } from "lucide-react"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 2 minutes",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "24/7",
      responseTime: "< 2 hours",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Business Hours",
      responseTime: "Immediate",
      color: "from-purple-500/20 to-pink-500/20",
    },
  ]

  const faqs = [
    {
      question: "How do I get started with hosting?",
      answer:
        "Getting started is easy! Choose a hosting plan, register a domain (or transfer an existing one), and we'll help you set everything up.",
    },
    {
      question: "What's included in my hosting plan?",
      answer:
        "All plans include SSD storage, free SSL certificates, email accounts, 24/7 support, and a 99.9% uptime guarantee.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes! You can upgrade your hosting plan at any time. The upgrade takes effect immediately with prorated billing.",
    },
    {
      question: "Do you offer website migration?",
      answer: "We offer free website migration for all new customers. Our team will handle the entire process for you.",
    },
    {
      question: "What's your uptime guarantee?",
      answer:
        "We guarantee 99.9% uptime. If we don't meet this standard, you'll receive account credits as compensation.",
    },
    {
      question: "How do I create email accounts?",
      answer:
        "You can create email accounts through your control panel. All hosting plans include email accounts with your domain.",
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
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">Support Center</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              We're Here to
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Help You</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get the support you need, when you need it. Our expert team is available 24/7 to help you succeed.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help articles, guides, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500 h-14 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Get Support Your Way
              </h2>
            </div>

            <StaggerAnimation>
              <div className="grid md:grid-cols-3 gap-8">
                {supportChannels.map((channel, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer"
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`p-3 bg-gradient-to-r ${channel.color} rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <channel.icon className="h-8 w-8 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                        {channel.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                        {channel.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          <Clock className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="text-sm text-gray-400">{channel.availability}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Users className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-sm text-gray-400">Response: {channel.responseTime}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                        Contact Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Contact Form */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white text-center">Send Us a Message</CardTitle>
                  <p className="text-gray-400 text-center">
                    Can't find what you're looking for? Send us a detailed message and we'll get back to you quickly.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <Input
                          placeholder="Your name"
                          className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <Select>
                        <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <Textarea
                        placeholder="Describe your question or issue in detail..."
                        className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500 min-h-[120px]"
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
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
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <HelpCircle className="h-5 w-5 text-cyan-400 group-hover:animate-pulse" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                            {faq.question}
                          </h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{faq.answer}</p>
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

      {/* Emergency Support */}
      <ScrollAnimation animation="scale">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30 transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Need Urgent Help?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  If you're experiencing a critical issue that affects your website's availability, contact our
                  emergency support line immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-red-500/25"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Emergency: +1 (555) 911-HOST
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10 hover:scale-110 transition-all duration-300"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Priority Live Chat
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
