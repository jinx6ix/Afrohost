"use client"

import React from "react"

import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Mail, Phone, MapPin, Clock, ArrowRight, Users, Globe, MessageCircle } from "lucide-react"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    newsletter: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@hostpro.com",
      description: "Get in touch via email",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak with our experts",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Tech Street, San Francisco, CA 94105",
      description: "Our headquarters",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "24/7 Support Available",
      description: "We're always here to help",
    },
  ]

  const reasons = [
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Get advice from hosting professionals with years of experience",
    },
    {
      icon: Globe,
      title: "Custom Solutions",
      description: "Tailored hosting strategies designed for your specific needs",
    },
    {
      icon: MessageCircle,
      title: "Rapid Response",
      description: "Quick turnaround on inquiries and technical support",
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
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30">Get In Touch</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Ready to Get
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Started?</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Contact our hosting experts for personalized recommendations and answers to all your hosting questions.
              We're here to help you succeed online.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-900/50 border-slate-700 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                          <Input
                            required
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                          <Input
                            required
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                          <Input
                            required
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                          <Input
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                          <Select onValueChange={(value) => handleInputChange("subject", value)}>
                            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="sales">Sales Inquiry</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="billing">Billing Question</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                        <Textarea
                          required
                          placeholder="Tell us about your hosting needs, questions, or how we can help you..."
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500 min-h-[120px]"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                          className="border-slate-600 data-[state=checked]:bg-cyan-500"
                        />
                        <label htmlFor="newsletter" className="text-sm text-gray-300">
                          Subscribe to our newsletter for hosting tips and updates
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                      >
                        Send Message
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <Card
                        key={index}
                        className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                              <info.icon className="h-5 w-5 text-cyan-400 group-hover:animate-pulse" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                {info.title}
                              </h3>
                              <p className="text-cyan-400 text-sm">{info.details}</p>
                              <p className="text-gray-400 text-xs mt-1">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Why Choose HostPro?</h2>
                  <div className="space-y-4">
                    {reasons.map((reason, index) => (
                      <Card
                        key={index}
                        className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                              <reason.icon className="h-5 w-5 text-green-400 group-hover:animate-pulse" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                                {reason.title}
                              </h3>
                              <p className="text-gray-400 text-sm">{reason.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Contact */}
                <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 transform hover:scale-105 transition-all duration-500">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Need Immediate Help?</h3>
                    <p className="text-gray-300 mb-4">
                      Our support team is available 24/7 to assist you with any urgent hosting issues.
                    </p>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now: (555) 123-4567
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  )
}
