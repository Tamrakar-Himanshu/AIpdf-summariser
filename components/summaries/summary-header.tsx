import { Calendar, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatFileName } from "@/lib/utils";

export function SummaryHeader({
  title,
  created_at,
  readingTime,
}: {
  title: string;
  created_at: any;
  readingTime: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant={"secondary"}
            className="relative px-4 py-1.5 text-sm font-medium bg-white/80 backdrop:blur-xs rounded-full"
          >
            <Sparkles />
            AI SUmmary
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-rose-500" />
            {new Date(created_at).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-rose-500" />
            {readingTime} Min Read
          </div>
        </div>
        <div>
          <Link
            href={"/dashboard"}
            className="flex items-center gap-2 self-start"
          >
            <Button
              variant={"link"}
              size="sm"
              className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop:blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-rose-100/30  bg-rose-100 px-2 sm:px-3"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:translatex-x-0.5" />
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                Back <span className="hidden sm:inline">To DashBoard</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <h1 className="mt-4 text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-pink-700 to-red-900">
        {formatFileName(title)}
      </h1>
    </div>
  );
}
