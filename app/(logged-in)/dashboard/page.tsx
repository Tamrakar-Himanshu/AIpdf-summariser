import React from "react";
import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
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
  const uploadLimit = 5; // Example limit, replace with actual logic
  const summaries = await getSummaries(user.id);
  return (
    <main className="min-h-screen">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-3 justify-between">
            <div className="">
              <h1 className="text-4xl font-bold  tracking-tight bg-linear-to-r text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-rose-500">
                Welcome to your dashboard!
              </h1>
              <p className="text-gray-600">
                Transform Your Pdf into concise, actionable insights
              </p>
            </div>
            <Button
              variant={"link"}
              className="mt-4 bg-linear-to-r from-slate-900 to-rose-500 text-white rounded-full px-4 py-2 flex items-center hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="h-2 w-2 mx-2 " />
                Upload
              </Link>
            </Button>
          </div>
          <div className=" mb-6">
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-6 rounded relative">
              <p className="text-xs  sm:text-sm ">
                You Have Reached The Limit Of {uploadLimit} Uploads On Basic
                Plan
                <Link
                  href="/#pricing"
                  className="text-rose-600 font-medium underline inline-flex items-center"
                >
                  Click Here to Upgrade TO PRO
                  <ArrowRight className="h-4 w-4 inline-block" /> for unlimited
                  uploads.
                </Link>
              </p>
            </div>
          </div>
          {summaries.length === 0 && <EmptySummary />}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
