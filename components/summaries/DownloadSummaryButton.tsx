"use client";
import React from "react";
import { Button } from "../ui/button";

export const DownloadSummaryButton = ({
  title,
  summaryText,
  createdAt,
  fileName,
}: {
  title: string;
  summaryText: string;
  createdAt: string;
  fileName: string;
}) => {
  return (
    <div>
      <Button
        size={"sm"}
        className=" h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
        onClick={() => {
          const element = document.createElement("a");
          const file = new Blob(
            [
              `Title: ${title}\n`,
              `Created At: ${createdAt}\n`,
              `Source File: ${fileName}\n\n`,
              summaryText,
            ],
            { type: "text/plain" }
          );
          element.href = URL.createObjectURL(file);
          element.download = `${title}-summary.txt`;
          document.body.appendChild(element);
          element.click();
        }}
      >
        Download{" "}
      </Button>
    </div>
  );
};
