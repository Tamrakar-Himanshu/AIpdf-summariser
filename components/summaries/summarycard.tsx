import React from "react";
import { Card } from "../ui/card";
import { DeleteButton } from "./deletebutton";
import Link from "next/link";
import {
  FileText,
  Clock,
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Loader2,
  Calendar,
  Hash,
  BookOpen,
  Zap,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { formatFileName } from "@/lib/utils";

export const summaryHeader = ({
  title,
  created_at,
}: {
  title: string;
  created_at: string;
}) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 mb-2 group-hover:text-violet-700 transition-colors duration-300">
          {formatFileName(title)}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      className: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",
      pulse: true,
    },
    processing: {
      icon: Loader2,
      className: "bg-blue-500 text-white shadow-lg shadow-blue-500/30",
      spin: true,
    },
    pending: {
      icon: Clock,
      className: "bg-amber-500 text-white shadow-lg shadow-amber-500/30",
      pulse: false,
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 hover:scale-105 backdrop-blur-sm",
        config.className
      )}
    >
      <Icon className={cn("w-3 h-3")} />
      <span className="capitalize">{status}</span>
    </div>
  );
};

// Design Option 1: Neumorphism with Bold Colors
export const SummaryCardNeo = ({ summary }: { summary: any }) => {
  const wordCount = summary.summary_text
    ? summary.summary_text.split(" ").length
    : 0;

  return (
    <div className="group h-full">
      <Card className="relative h-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 shadow-[8px_8px_16px_#d1d5db,_-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#d1d5db,_-12px_-12px_24px_#ffffff] transition-all duration-500 border-0 rounded-3xl">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Delete Button */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-[4px_4px_8px_#d1d5db,_-4px_-4px_8px_#ffffff] p-1">
            <DeleteButton summaryID={`${summary.id}`} />
          </div>
        </div>

        <Link href={`/summaries/${summary.id}`} className="h-full block">
          <div className="p-8 h-full flex flex-col">
            {summaryHeader({
              title: summary.title,
              created_at: summary.created_at,
            })}

            <div className="flex-1 mb-6">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 mb-4">
                {summary.summary_text ||
                  "Processing your document to generate insights..."}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-[inset_2px_2px_4px_#d1d5db,_inset_-2px_-2px_4px_#ffffff]">
                  <Hash className="w-3 h-3" />
                  <span className="font-semibold">{wordCount} words</span>
                </div>
                <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-[inset_2px_2px_4px_#d1d5db,_inset_-2px_-2px_4px_#ffffff]">
                  <Eye className="w-3 h-3" />
                  <span className="font-semibold">2 min read</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <StatusBadge status={summary.status} />

              <div className="flex items-center gap-2 text-violet-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <span>Open</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

// Design Option 2: Modern Card with Floating Elements
export const SummaryCardModern = ({ summary }: { summary: any }) => {
  const wordCount = summary.summary_text
    ? summary.summary_text.split(" ").length
    : 0;

  return (
    <div className="group h-full">
      <div className="relative h-full">
        {/* Floating Background Elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-violet-300/20 to-purple-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100"></div>

        <Card className="relative h-full overflow-hidden bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl group-hover:scale-[1.02] z-10">
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-violet-400 to-purple-400"></div>

          {/* Delete Button */}
          <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/30">
              <DeleteButton summaryID={`${summary.id}`} />
            </div>
          </div>

          <Link href={`/summaries/${summary.id}`} className="h-full block">
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-rose-500 to-violet-600 rounded-2xl shadow-lg group-hover:shadow-rose-500/25 transition-all duration-300 group-hover:-rotate-6">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-violet-700 transition-colors duration-300">
                    {formatFileName(summary.title)}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>
                      {formatDistanceToNow(new Date(summary.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 mb-6">
                <div className="relative">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {summary.summary_text ||
                      "Your document is being processed to extract key insights..."}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-2">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span className="font-semibold">{wordCount} words</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-full px-3 py-2">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="font-semibold">AI Summary</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <StatusBadge status={summary.status} />

                  <div className="flex items-center gap-2 text-violet-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
};

// Design Option 3: Minimal with Bold Typography
export const SummaryCardMinimal = ({ summary }: { summary: any }) => {
  const wordCount = summary.summary_text
    ? summary.summary_text.split(" ").length
    : 0;

  return (
    <div className="group h-full">
      <div className="relative h-full p-1 bg-gradient-to-br from-gray-200 via-gray-100 to-white rounded-3xl">
        <Card className="h-full bg-white rounded-3xl border-0 shadow-none group-hover:bg-gray-50/50 transition-all duration-300 overflow-hidden">
          {/* Subtle Top Border */}
          <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>

          {/* Delete Button */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <DeleteButton summaryID={`${summary.id}`} />
          </div>

          <Link href={`/summaries/${summary.id}`} className="h-full block">
            <div className="p-8 h-full flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-violet-600 transition-colors duration-300">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {formatDistanceToNow(new Date(summary.created_at), {
                      addSuffix: true,
                    }).toUpperCase()}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 line-clamp-2 leading-tight group-hover:text-violet-600 transition-colors duration-300">
                  {formatFileName(summary.title)}
                </h3>
              </div>

              <div className="flex-1 mb-8">
                <p className="text-gray-600 text-base leading-relaxed line-clamp-4">
                  {summary.summary_text || "Document processing in progress..."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono uppercase tracking-wider">
                  <span>{wordCount} Words</span>
                  <span>Quick Read</span>
                </div>

                <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

                <div className="flex items-center justify-between">
                  <StatusBadge status={summary.status} />

                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>VIEW</span>
                    <div className="w-6 h-px bg-gray-900 group-hover:w-8 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
};

// Default Export - Choose your preferred design
export const SummaryCard = SummaryCardModern;
