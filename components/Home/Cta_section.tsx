import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Cta_section = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready To Save Hours Of Reading Time?</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Transform lengthy Docs Into Clear, actionable insights with our
            AI_POWERED Summariser
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div className="">
              <Button
                size="lg"
                variant={"link"}
                className="w-full min-[400px]:w-[150px] bg-gradient-to-r from-slate-900 to-rose-500 
               hover:from-rose-500 hover:to-slate-900 hover:text-white text-white 
               transition-all duration-300 flex justify-center items-center px-6 py-3"
              >
                <Link href={"#pricing"} className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta_section;
