import React from "react";
import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Sparkles,
  FileText,
  TrendingUp,
  Clock,
  Upload as UploadIcon,
} from "lucide-react";
import { SummaryCard } from "@/components/summaries/summarycard";
import { getSummaries } from "@/lib/getSummaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EmptySummary } from "@/components/summaries/empty-summary";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/sign-in");
  }

  const uploadLimit = 10;
  const summaries = await getSummaries(user.id);
  const remainingUploads = uploadLimit - summaries.length;
  const usagePercentage = (summaries.length / uploadLimit) * 100;

  return (
    <main className="min-h-screen relative overflow-hidden dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Enhanced Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-rose-50/30 dark:from-slate-950 dark:via-slate-800 dark:to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/20 via-transparent to-transparent dark:from-rose-900/20 dark:via-transparent dark:to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/10 via-transparent to-transparent dark:from-blue-900/10 dark:via-transparent dark:to-transparent"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-200/20 to-pink-200/20 dark:from-rose-900/30 dark:to-pink-900/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-purple-200/15 dark:from-blue-900/25 dark:to-purple-900/25 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <BgGradient />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 pb-12 sm:pt-16 sm:pb-20">
          {/* Header Section with Glass Morphism */}
          <div className="backdrop-blur-xl bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 mb-8 shadow-2xl shadow-rose-500/5">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-slate-700/80 px-3 py-1 rounded-full">
                    Dashboard
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-rose-600 to-pink-600 dark:from-slate-100 dark:via-rose-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
                  Welcome back!
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl leading-relaxed">
                  Transform your PDFs into{" "}
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    concise, actionable insights
                  </span>{" "}
                  with AI-powered intelligence
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FileText className="h-5 w-5 text-rose-500" />
                    <span className="font-medium">
                      {summaries.length} Documents
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <span className="font-medium">All Time Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Instant Processing</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Upload Button */}
              <div className="flex flex-col items-center gap-4">
                <Link href="/upload">
                  <Button className="group relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-rose-500/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-rose-500/40">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="p-1 bg-white/20 rounded-lg">
                        <Plus className="h-5 w-5" />
                      </div>
                      Upload PDF
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Button>
                </Link>

                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Drag & drop or click to upload
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Usage Card */}
          <div className="backdrop-blur-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/30 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <UploadIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-slate-100">
                    Upload Usage
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Basic Plan
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-gray-900 dark:text-slate-100">
                  {summaries.length}
                  <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                    /{uploadLimit}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  documents used
                </div>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="relative h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${usagePercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
              </div>
              {usagePercentage > 80 && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Usage Status */}
            <div className="flex items-center justify-between">
              {remainingUploads > 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {remainingUploads} uploads remaining
                  </span>
                </p>
              ) : (
                <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  <span className="font-semibold">Upload limit reached</span>
                </p>
              )}

              {remainingUploads <= 0 && (
                <Link
                  href="/#pricing"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors duration-200"
                >
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </div>
          </div>

          {/* Content Section */}
          {summaries.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/20 rounded-3xl p-12 shadow-xl">
              <EmptySummary />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
                  Your Documents
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                  {summaries.length} total
                </div>
              </div>

              {/* Enhanced Grid */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {summaries.map((summary, index) => (
                  <div
                    key={summary.id}
                    className="transform transition-all duration-300 hover:scale-105 animate-fade-in"
                  >
                    <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 border border-white/30 dark:border-slate-700/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      <SummaryCard summary={summary} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
