import React from "react";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Zap,
  Brain,
  Download,
  Upload,
  Eye,
} from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="relative mx-auto flex flex-col items-center justify-center py-8 sm:py-16 lg:py-24 transition-all  overflow-hidden w-full">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-rose-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent dark:from-rose-900/30 dark:via-transparent dark:to-transparent -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-100/30 via-transparent to-transparent dark:from-violet-900/30 dark:via-transparent dark:to-transparent -z-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-rose-200/20 to-pink-200/20 dark:from-rose-900/40 dark:to-pink-900/40 rounded-full blur-3xl animate-pulse -z-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-200/15 to-purple-200/15 dark:from-violet-900/35 dark:to-purple-900/35 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200/10 to-cyan-200/10 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full blur-3xl animate-pulse delay-500 -z-10"></div>

        {/* Animated Badge */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 via-pink-300 to-violet-300 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative">
            <Badge className="relative px-8 py-3 bg-white/90 dark:bg-slate-800/95 backdrop-blur-sm border border-white/40 dark:border-slate-600/50 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles className="h-5 w-5 text-rose-500 animate-pulse" />
                  <div className="absolute inset-0 h-5 w-5 text-rose-300 animate-ping"></div>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-rose-600 to-violet-600 dark:from-rose-400 dark:to-violet-400 bg-clip-text text-transparent">
                  Powered By AI Intelligence
                </span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </Badge>
          </div>
        </div>

        {/* Enhanced Main Heading */}
        <div className="text-center mb-4 relative">
          <h1 className="text-3xl sm:text-6xl lg:text-7xl xl:text-4xl font-black tracking-tight mb-3 leading-none">
            <span className="block mb-2 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 dark:from-slate-100 dark:via-gray-200 dark:to-slate-100 bg-clip-text text-transparent">
              Unleash New Possibilities
            </span>
          </h1>
        </div>

        {/* Enhanced Subtitle */}
        <div className="text-center mb-12 max-w-4xl">
          <p className="text-xl sm:text-2xl lg:text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8">
            Harness the power of{" "}
            <span className="font-bold text-rose-600 dark:text-rose-400">
              artificial intelligence
            </span>{" "}
            to extract key insights from your documents in seconds
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              {
                icon: Upload,
                text: "Upload",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Brain,
                text: "AI Process",
                color: "from-violet-500 to-purple-500",
              },
              {
                icon: Eye,
                text: "Extract",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Download,
                text: "Download",
                color: "from-rose-500 to-pink-500",
              },
            ].map((item, index) => (
              <div
                key={item.text}
                className="group flex items-center gap-2 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border border-white/40 dark:border-slate-600/50 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
              >
                <div
                  className={`p-1.5 bg-gradient-to-r ${item.color} rounded-full`}
                >
                  <item.icon className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className="relative group">
          {/* Button Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

          <Link href="/#pricing">
            <Button className="relative group/btn overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-violet-600 hover:from-rose-700 hover:via-pink-700 hover:to-violet-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border-0">
              {/* Button Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

              {/* Button Content */}
              <div className="relative flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Zap className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-black tracking-wide">
                    Get Started Free
                  </span>
                </div>

                <div className="flex items-center">
                  <ArrowRight className="h-6 w-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  <ArrowRight className="h-6 w-6 -ml-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-2 transition-all duration-300 delay-100" />
                </div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
            Trusted by thousands of users
          </p>
          <div className="flex justify-center items-center gap-8 text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold">99.9% Uptime</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              <span className="text-xs font-semibold">Enterprise Security</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-500"></div>
              <span className="text-xs font-semibold">AI Powered</span>
            </div>
          </div>
        </div>

        {/* Floating Action Indicators */}
        <div className="absolute top-1/4 left-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500 hidden lg:block">
          <div className="flex flex-col gap-4">
            <FileText className="h-8 w-8 text-rose-400 animate-pulse" />
            <div className="w-px h-16 bg-gradient-to-b from-rose-400 to-transparent"></div>
            <Brain className="h-8 w-8 text-violet-400 animate-pulse delay-500" />
          </div>
        </div>

        <div className="absolute top-1/4 right-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500 hidden lg:block">
          <div className="flex flex-col gap-4 items-end">
            <Sparkles className="h-8 w-8 text-pink-400 animate-pulse delay-300" />
            <div className="w-px h-16 bg-gradient-to-b from-pink-400 to-transparent"></div>
            <Zap className="h-8 w-8 text-emerald-400 animate-pulse delay-700" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
