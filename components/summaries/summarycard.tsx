import React from "react";
import { Card } from "../ui/card";
import { DeleteButton } from "./deletebutton";
import Link from "next/link";
import { FileText } from "lucide-react";
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
    <div className="flex items-center gap-2 sm:gap-4">
      <FileText className=" w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold text-gray-900">
          {formatFileName(title)}
        </h2>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-gray-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {" "}
      {status}
    </span>
  );
};

export const SummaryCard = ({ summary }: { summary: any }) => {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryID={`${summary.id}`} />
        </div>
        <Link href={`/summaries/${summary.id}`} className="h-full block ">
          <div className="flex flex-col gap-3 sm:gap-4 px-5">
            {summaryHeader({
              title: summary.title,
              created_at: summary.created_at,
            })}
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
            </p>
            <p className="text-sm text-gray-500">2024</p>
            <div className=" flex justify-between items-center mt-2 sm:mt-4 ">
              <StatusBadge status={summary.status} />
              <span></span>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};
