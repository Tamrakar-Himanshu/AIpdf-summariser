"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControl } from "./navigationControl";
import ProgressBar from "./progressBar";
import { parseSection } from "@/utils/summary-helper";
import ContentSection from "./contentSection";

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex flex-col gap-2 sticky bottom-[-10] bg-background/95 backdrop-blur-xs text-center pb-4 border-b border-rose-50/10 z-10 ">
    <h2 className="text-xl sm:text-3xl text-lg-4xl gap-2 font-bold text-gray-800 items-center flex justify-center text-center">
      {title}
    </h2>
  </div>
);

export const SummaryViewer = ({ summary }: { summary: string }) => {
  // Split summary into sections by "# " (markdown header)
  const sections = summary
    .split("\n# ")
    .map((section, idx) => (idx === 0 ? section : "# " + section))
    .map(parseSection)
    .filter((section) => section.title || section.points.length > 0);

  const [currentSection, setCurrentSection] = useState<number>(0);

  return (
    <Card className=" relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg border border-rose-500/10 shadow-2xl rounded-3xl">
      <ProgressBar sections={sections} currentSection={currentSection} />
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-rose-500/20 scrollbar-track-transparent pt-6 sm:pt-20 sm:pb-24">
        <div className=" px-4 sm:px-6">
          <SectionTitle title={sections[currentSection].title} />
          <ContentSection points={sections[currentSection].points} title={""} />
        </div>
      </div>
      <NavigationControl
        currentSection={currentSection}
        totalSections={sections.length}
        onSectionSelect={setCurrentSection}
        onNext={() =>
          setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1))
        }
        onPrevious={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
      />
    </Card>
  );
};
