import React, { ReactNode } from "react";
import {
  Sparkles,
  Twitter,
  Github,
  Mail,
  Phone,
  Heart,
  Zap,
  Shield,
  Clock,
  Star,
  Linkedin,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-40 h-40 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/25">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-wide">
                    Summarise
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    AI Powered Insights
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed max-w-md">
                Transform your PDFs into actionable insights with cutting-edge
                AI technology. Fast, secure, and incredibly accurate.
              </p>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-700/50">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span className="text-gray-300 font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-700/50">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-gray-300 font-medium">Fast</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-700/50">
                  <Star className="w-3 h-3 text-rose-400" />
                  <span className="text-gray-300 font-medium">Trusted</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Get in Touch
              </h4>

              <div className="space-y-4">
                <a
                  href="mailto:DevHiXu@gmail.com"
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-rose-500/50 group-hover:bg-rose-500/10 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Email Support</span>
                    <p className="text-xs text-gray-400">DevHiXu@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+1234567890"
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-violet-500/50 group-hover:bg-violet-500/10 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Phone Support</span>
                    <p className="text-xs text-gray-400">+91 123456789</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Help Center</span>
                    <p className="text-xs text-gray-400">24/7 Support</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social & Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Connect With Us
              </h4>

              <div className="flex gap-4">
                <a
                  href="https://github.com/Tamrakar-Himanshu"
                  className="group p-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                </a>

                <a
                  href="https://linkedin.com/in/himanshu-tamrakar-7a3843226/"
                  className="group p-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-gray-500/50 hover:bg-gray-500/10 transition-all duration-300 hover:scale-105"
                  aria-label="GitHub"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                <h5 className="text-sm font-bold text-white mb-4">
                  Platform Stats
                </h5>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-rose-400">
                      10K+
                    </div>
                    <div className="text-xs text-gray-400">
                      Documents Processed
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-violet-400">
                      99.9%
                    </div>
                    <div className="text-xs text-gray-400">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>&copy; {currentYear} DevHixu. All rights reserved.</span>
                <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
              </div>

              <div className="flex items-center gap-6 text-xs text-gray-400">
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
