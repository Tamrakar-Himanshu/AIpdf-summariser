import React, { ReactNode } from "react";
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Upload,
  Eye,
} from "lucide-react";

// Enhanced Footer Component


// Enhanced How It Works Component
type Step = {
  icon: ReactNode;
  label: string;
  description: string;
  color: string;
  bgColor: string;
};

const steps: Step[] = [
  {
    icon: <Upload size={48} strokeWidth={1.5} />,
    label: "Upload Your PDF",
    description: "Drag & drop or browse to upload your document securely",
    color: "text-blue-600",
    bgColor: "from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: <BrainCircuit size={48} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Our advanced AI processes and analyzes your content",
    color: "text-violet-600",
    bgColor: "from-violet-500/10 to-purple-500/10"
  },
  {
    icon: <Eye size={48} strokeWidth={1.5} />,
    label: "Get Insights",
    description: "Receive clear, concise summaries and key insights instantly",
    color: "text-emerald-600",
    bgColor: "from-emerald-500/10 to-teal-500/10"
  },
];

export default function Works() {
  return (
    <section className="relative py-16 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-rose-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-rose-100 border border-rose-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
            <span className="text-sm font-bold text-rose-600 uppercase tracking-wide">
              How It Works
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Transform PDFs into{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                insights
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-rose-200/50 to-violet-200/50 transform -skew-y-1 rounded-lg"></div>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform makes document analysis simple, fast, and incredibly accurate
          </p>
        </div>
        
        {/* Enhanced Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <StepItem {...step} index={idx + 1} />
              
              {/* Connection Lines */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200"></div>
                    <ArrowRight 
                      size={24} 
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 text-rose-500 animate-pulse" 
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-white/40 rounded-full px-6 py-3 shadow-xl">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm font-semibold text-gray-700">Join 10,000+ satisfied users</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description, color, bgColor, index }: Step & { index: number }) {
  return (
    <div className="group relative h-full">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-200/50 via-violet-200/50 to-emerald-200/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full group-hover:bg-white/90">
        
        {/* Step Number */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-rose-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
          {index}
        </div>
        
        {/* Icon */}
        <div className="mb-8">
          <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <div className={color}>
              {icon}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors duration-300">
            {label}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Hover Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <ArrowRight className="w-5 h-5 text-rose-500" />
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,1)_1px,_transparent_1px)] bg-[length:20px_20px] rounded-3xl"></div>
      </div>
    </div>
  );
}