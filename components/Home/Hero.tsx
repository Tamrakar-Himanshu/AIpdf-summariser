import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-20 transition-all animate-in lg:px-12 max-w-7xl">
        <div className="flex">
          <div className="relative p-[5px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
            <Badge
              variant={"secondary"}
              className="relative text-base px-6 py-2 font-medium bg-white rounded-full  transition-colors duration-200"
            >
              <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
              <p className="text-sm  font-bold text-rose-600 hover:scale-108 transition-all duration-600">
                Powered By HiXu
              </p>
            </Badge>
          </div>
        </div>

        <h3 className="font-bold py-6 text-center">
          Transform PDFs into{" "}
          <span className="relative inline-block">
            concise
            <span
              className="absolute inset-0 bg-rose-200/50 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>{" "}
          summaries
        </h3>
        <h4 className="text-lg sm:text-xl  lg:text-md lg:px-0 text-gray-600 max-w-4xl mx-auto px-4 text-center">
          This is a powerful tool that helps you quickly extract key information
          from your PDF documents.
        </h4>
        <Button
          variant="link"
          className="group relative overflow-hidden text-white mt-6 lg:w-[12vw] sm:w-auto text-base sm:text-lg md:text-xl lg:text-2xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-6 lg:mt-16 shadow-lg hover:shadow-xl hover:no-underline"
        >
          <span className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-slate-800 to-rose-600  transition-[background-position] duration-[1000ms] group-hover:bg-right z-0 rounded-full" />
          <Link
            href="/#pricing"
            className="flex items-center gap-4 relative z-10"
          >
            <p className="text-xs"> Get Started</p>
            <ArrowRight className="h-6 w-6 animate-pulse" />
          </Link>
        </Button>
      </section>
    </>
  );
};

export default HeroSection;
