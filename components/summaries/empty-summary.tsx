import { FileText, Link } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export const EmptySummary = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4   ">
        <FileText className="w-12 h-12  text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-600">NO Summary Yet</h3>
        <p className=" text-gray-500 max-w-md">
          Upload Your First One To Get Started
        </p>
      </div>
    </div>
  );
};
