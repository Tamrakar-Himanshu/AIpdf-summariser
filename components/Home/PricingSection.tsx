"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Check, Star, Sparkles, Zap, Crown } from "lucide-react";
import Link from "next/link";
import { Plan, plans } from "../data/plans";
import { useState, useEffect } from "react";

// Define props explicitly for clarity, extending Plan interface
interface PricingCardProps extends Plan {
  isPopular?: boolean;
  index?: number;
}

function PricingCard({
  id,
  name,
  price,
  description,
  items,
  paymentLink,
  expandedContent,
  isPopular = false,
  index = 0,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    setAnimationDelay(index * 150);
  }, [index]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getCardTheme = () => {
    const themes = {
      free: {
        gradient: "from-gray-500/20 via-slate-500/20 to-zinc-500/20",
        border: "border-gray-500/30",
        glow: "shadow-gray-500/20",
        icon: <Star className="w-5 h-5 text-gray-400" />,
        button:
          "from-gray-600 to-slate-600 hover:from-gray-500 hover:to-slate-500",
      },
      basic: {
        gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/20",
        icon: <Zap className="w-5 h-5 text-blue-400" />,
        button:
          "from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500",
      },
      pro: {
        gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/20",
        icon: <Crown className="w-5 h-5 text-purple-400" />,
        button:
          "from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
      },
      enterprise: {
        gradient: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
        border: "border-emerald-500/30",
        glow: "shadow-emerald-500/20",
        icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
        button:
          "from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500",
      },
    };
    return themes[id as keyof typeof themes] || themes.basic;
  };

  const theme = getCardTheme();

  return (
    <div
      className={cn(
        "relative group cursor-pointer transform-gpu",
        "transition-all duration-700 ease-out",
        isHovered ? "scale-105 -translate-y-2" : "scale-100 translate-y-0"
      )}
      style={{
        animationDelay: `${animationDelay}ms`,
        animation: "slideInUp 0.8s ease-out forwards",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className={cn(
            "absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30",
            "bg-gradient-to-br",
            theme.gradient,
            "transition-all duration-1000",
            isHovered ? "scale-150 rotate-45" : "scale-100 rotate-0"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-20 -left-20 w-32 h-32 rounded-full opacity-20",
            "bg-gradient-to-tr",
            theme.gradient,
            "transition-all duration-1000 delay-200",
            isHovered ? "scale-125 -rotate-45" : "scale-100 rotate-0"
          )}
        />
      </div>

      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Main Card */}
      <div
        className={cn(
          "relative backdrop-blur-xl bg-white/10 border rounded-2xl p-8",
          "shadow-2xl transition-all duration-700",
          theme.border,
          isHovered ? cn("shadow-3xl", theme.glow) : "shadow-xl",
          isPopular ? "ring-2 ring-yellow-400/50" : "",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
          isHovered ? "before:opacity-100" : ""
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {theme.icon}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {name}
            </h3>
          </div>
          <div
            className={cn(
              "transition-transform duration-300",
              isExpanded ? "rotate-180" : "rotate-0"
            )}
          >
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              ${price}
            </span>
            <span className="text-lg font-medium text-gray-600">/month</span>
          </div>
          <p className="text-gray-600 mt-2 leading-relaxed">{description}</p>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 group/item"
              style={{
                animationDelay: `${animationDelay + idx * 100}ms`,
              }}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                  "bg-gradient-to-r",
                  theme.button.split(" ")[0],
                  theme.button.split(" ")[1],
                  "transition-all duration-300 group-hover/item:scale-110"
                )}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors duration-200">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Expanded Content */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isExpanded ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
          )}
        >
          {expandedContent && expandedContent.length > 0 && (
            <div className="pt-4 border-t border-gray-200/30">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Additional Features
              </h4>
              <div className="space-y-2">
                {expandedContent.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={paymentLink}
          className={cn(
            "group/btn relative w-full rounded-xl flex items-center justify-center gap-2 py-4 px-6",
            "bg-gradient-to-r text-white font-semibold text-lg",
            "transition-all duration-300 overflow-hidden",
            "shadow-lg hover:shadow-xl",
            theme.button,
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:translate-x-full before:transition-transform before:duration-500",
            "hover:before:translate-x-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="relative z-10 flex items-center gap-2">
            Choose {name}
            <ArrowRight
              className={cn(
                "w-5 h-5 transition-transform duration-300",
                "group-hover/btn:translate-x-1"
              )}
            />
          </span>
        </Link>
      </div>
    </div>
  );
}

export const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("pricing");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <section className="relative py-24 lg:py-32 overflow-hidden" id="pricing">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30" />
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className={cn(
              "text-center mb-16 transition-all duration-1000",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full text-sm font-medium text-purple-700 mb-6">
              <Sparkles className="w-4 h-4" />
              Flexible Pricing
            </div>
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unlock your full potential with our carefully crafted pricing
              tiers. Each plan is designed to grow with your ambitions.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                {...plan}
                isPopular={plan.id === "pro"}
                index={index}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={cn(
              "text-center mt-16 transition-all duration-1000 delay-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-gray-600 mb-4">Need a custom solution?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Email Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:support@yourcompany.com"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                <span>or email directly:</span>
                <span className="font-semibold">support@yourcompany.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
