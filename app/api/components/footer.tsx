import { Server, Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-slate-800 relative z-10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4 group">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Server className="h-6 w-6 text-cyan-400 group-hover:animate-pulse" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                HostPro
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-md">
              Premium web hosting solutions trusted by thousands of customers worldwide. Fast, secure, and reliable
              hosting for your success.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Hosting</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {[
                { name: "Shared Hosting", href: "/hosting/shared" },
                { name: "VPS Hosting", href: "/hosting/vps" },
                { name: "Dedicated Servers", href: "/hosting/dedicated" },
                { name: "Cloud Hosting", href: "/hosting/cloud" },
                { name: "WordPress Hosting", href: "/hosting/wordpress" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors transform hover:translate-x-1 duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {[
                { name: "About Us", href: "/about" },
                { name: "Features", href: "/features" },
                { name: "Pricing", href: "/pricing" },
                { name: "Support", href: "/support" },
                { name: "Blog", href: "/blog" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors transform hover:translate-x-1 duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center group">
                <Mail className="h-4 w-4 mr-2 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors">
                  support@hostpro.com
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-4 w-4 mr-2 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center group">
                <MapPin className="h-4 w-4 mr-2 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-colors">
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} HostPro. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Cookie Policy", href: "/cookies" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors transform hover:scale-105 duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
