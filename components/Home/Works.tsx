import {
  BrainCircuit,
  FileOutput,
  FileText,
  MoveRight,
  Pizza,
} from "lucide-react";
import React, { ReactNode } from "react";

type Step = {
  icon: ReactNode;
  label: String;
  description: String;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your Pdf",
    description: "Upload Your Pdf file to get Started",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Drag & Drop ",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get Summary",
    description: "Clear and Concise ",
  },
];
export default function Works() {
  return (
    <>
      <div className="py12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-4 sm:mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">
            How It Works
          </h2>
          <h3 className="font-bold text-md sm:text-3xl  max-w-2xl  mx-auto px-3">
            Transform any Pdf into an easy-to-digest summary in three steps
          </h3>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-stretch">
              <StepItem key={idx} {...step} />

              {idx < steps.length - 1 && (
                <div className="hidden md:block top-1/2 absolute -right-4 transform -translate-y-10 z-10 ">
                  <MoveRight
                    size={32}
                    strokeWidth={1.5}
                    className="text-rose-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <>
      <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors grounp w-full">
        <div className=" flex flex-col gap-4 h-full">
          <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
            <div className="text-rose-500">{icon}</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between"></div>
        <h4 className="text-center font-bold text-xl">{label}</h4>
        <p className="text-center text-gray-600 text-xs ">{description}</p>
      </div>
    </>
  );
}
