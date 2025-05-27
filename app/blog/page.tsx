import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Calendar, User, ArrowRight, Search, Server, Shield, Zap, Globe, TrendingUp, Clock } from "lucide-react"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"
import ScrollAnimation from "../components/scroll-animation"
import StaggerAnimation from "../components/stagger-animation"
import React from "react"

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Web Hosting: Trends for 2024",
    excerpt:
      "Explore the latest trends in web hosting technology and what they mean for your website's performance and security.",
    author: "Sarah Johnson",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Industry Trends",
    featured: true,
  }

  const blogPosts = [
    {
      title: "How to Choose the Right Hosting Plan for Your Business",
      excerpt: "A comprehensive guide to selecting the perfect hosting solution based on your specific needs.",
      author: "Michael Chen",
      date: "December 12, 2024",
      readTime: "12 min read",
      category: "Hosting Guide",
      icon: Server,
    },
    {
      title: "Website Security Best Practices for 2024",
      excerpt: "Essential security measures every website owner should implement to protect their online presence.",
      author: "Emily Rodriguez",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Security",
      icon: Shield,
    },
    {
      title: "Optimizing Website Performance: A Complete Guide",
      excerpt: "Learn how to make your website lightning-fast with these proven optimization techniques.",
      author: "David Kim",
      date: "December 8, 2024",
      readTime: "10 min read",
      category: "Performance",
      icon: Zap,
    },
    {
      title: "Understanding CDN: How It Boosts Your Website Speed",
      excerpt: "Discover how Content Delivery Networks work and why they're essential for global websites.",
      author: "Lisa Wang",
      date: "December 5, 2024",
      readTime: "15 min read",
      category: "Technology",
      icon: Globe,
    },
    {
      title: "WordPress Hosting: Shared vs Managed Solutions",
      excerpt: "Compare different WordPress hosting options to find the best fit for your WordPress site.",
      author: "James Thompson",
      date: "December 3, 2024",
      readTime: "9 min read",
      category: "WordPress",
      icon: TrendingUp,
    },
    {
      title: "Website Backup Strategies: Protecting Your Data",
      excerpt: "Learn about different backup methods and create a comprehensive backup strategy for your website.",
      author: "Anna Martinez",
      date: "December 1, 2024",
      readTime: "7 min read",
      category: "Data Protection",
      icon: Clock,
    },
  ]

  const categories = [
    "All Posts",
    "Hosting Guide",
    "Security",
    "Performance",
    "Technology",
    "WordPress",
    "Industry Trends",
    "Data Protection",
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">HostPro Blog</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Hosting Insights
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                & Expert Tips
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with the latest hosting trends, performance tips, and expert insights from our team of
              hosting professionals.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                />
              </div>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={
                    index === 0
                      ? "bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300"
                      : "border-slate-600 text-gray-300 hover:bg-slate-700 hover:scale-105 transition-all duration-300"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <ScrollAnimation animation="scale">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Article</h2>
              <Card className="bg-slate-900/50 border-slate-700 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:scale-105">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="p-8">
                    <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {featuredPost.date}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                      Read Full Article
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center p-8">
                    <div className="text-center">
                      <Server className="h-24 w-24 text-cyan-400 mx-auto mb-4 animate-pulse" />
                      <div className="text-lg font-semibold text-white">Featured Article</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Blog Posts Grid */}
      <ScrollAnimation animation="up">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Latest Articles</h2>

            <StaggerAnimation staggerDelay={0.15}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 group cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-slate-700 text-gray-300">{post.category}</Badge>
                        <post.icon className="h-6 w-6 text-cyan-400 group-hover:animate-pulse" />
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-cyan-400 hover:text-cyan-300 p-0 hover:scale-110 transition-all duration-300"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>
      </ScrollAnimation>

      {/* Newsletter Signup */}
      <ScrollAnimation animation="scale">
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 transform hover:scale-105 transition-all duration-500">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Stay Updated with Hosting News
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get the latest hosting insights, performance tips, and industry news
                  delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email"
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  />
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  )
}
