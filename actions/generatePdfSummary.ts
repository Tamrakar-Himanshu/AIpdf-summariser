"use server";

import { generateSummaryFromGemeni } from "@/lib/gemeni";
import { fetchAndExtractPdf } from "@/lib/langChain";

export async function generatePdfSummary(
  uploadRes: [
    {
      serverData: {
        userID: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadRes) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }

  const {
    serverData: {
      userID,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadRes[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }

  try {
    // Extract text from the uploaded PDF
    const pdfText = await fetchAndExtractPdf(pdfUrl);
    if (!pdfText) {
      return {
        success: false,
        message: "Failed to extract text from PDF",
        data: null,
      };
    }

    // Generate summary using Gemini
    let summary: string | null = null;
    try {
      summary = await generateSummaryFromGemeni(pdfText);
      console.log("summary:", summary);
    } catch (err) {
      console.error("Gemini summary generation failed:", err);
    }

    return {
      success: true,
      message: "File Upload Successful",
      data: {
        userID,
        file: { pdfUrl, fileName },
        summary: summary || "Summary could not be generated.",
      },
    };
  } catch (error) {
    console.error("PDF Summary Error:", error);
    return {
      success: false,
      message: "PDF Summary Generation Failed",
      data: null,
    };
  }
}
