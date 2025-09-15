import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";
export const UploadHeader = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-2 pb-4 sm:pt-12 lg:px-0">
      <div className="flex flex-col items-center justify-center text-center">
        <div className=" relative p-[5px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group mb-5 ">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors"
          >
            <Sparkle className=" h-6 w-6 my-2 text-rose-600 animate-pulse" />
            <p className=" text-base">Lets Go</p>
          </Badge>
        </div>
        <div className=" capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <p>
            Start Uploading{" "}
            <span className="relative inline-block">
              Your PDF's
              <span
                className="absolute inset-0 bg-green-200/50 rounded-lg transform -skew-y-1"
                aria-hidden="true"
              ></span>
            </span>{" "}
          </p>
          <p className=" mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
            Upload Your PDF's And Let AI Do The Magic
          </p>
        </div>
      </div>
    </div>
  );
};
