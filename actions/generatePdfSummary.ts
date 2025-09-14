"use server";

import { getDbconnection } from "@/lib/db";
import { generateSummaryFromGemeni } from "@/lib/gemeni";
import { fetchAndExtractPdf } from "@/lib/langChain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface UploadThingResponse {
  serverData: {
    userID: string;
    file: {
      url: string;
      key: string;
      name: string;
    };
  };
}

interface PDFSummaryResponse {
  userID: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

type GeneratePdfSummaryResult =
  | { success: false; message: string; data: null }
  | { success: true; message: string; data: PDFSummaryResponse };

type StorePdfSummaryResult =
  | { success: false; message: string }
  | { success: true; message: string; data: { id: any } };

/**
 * Generate a PDF summary after upload
 */
export async function generatePdfSummary(
  uploadRes: UploadThingResponse[]
): Promise<GeneratePdfSummaryResult> {
  console.log("generatePdfSummary called with:", uploadRes);

  if (!uploadRes || uploadRes.length === 0) {
    return {
      success: false,
      message: "File Upload Failed - No upload result",
      data: null,
    };
  }

  const {
    serverData: {
      userID,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadRes[0];

  console.log("Extracted data:", { userID, pdfUrl, fileName });

  if (!pdfUrl) {
    return {
      success: false,
      message: "File Upload Failed - No URL",
      data: null,
    };
  }

  try {
    // Extract text from uploaded PDF
    console.log("Extracting PDF text from:", pdfUrl);
    const pdfText = await fetchAndExtractPdf(pdfUrl);

    if (!pdfText) {
      return {
        success: false,
        message: "Failed to extract text from PDF",
        data: null,
      };
    }

    console.log("PDF text extracted, length:", pdfText.length);

    // Generate summary with Gemini
    let summary: string | null = null;
    try {
      console.log("Generating summary with Gemini...");
      summary = await generateSummaryFromGemeni(pdfText);
      console.log("Summary generated:", summary ? "Success" : "Failed");
    } catch (err) {
      console.error("Gemini summary generation failed:", err);
    }

    const responseData: PDFSummaryResponse = {
      userID,
      fileUrl: pdfUrl,
      fileName,
      summary: summary || "Summary could not be generated.",
      title: fileName.replace(".pdf", ""), // Default title from filename
    };

    console.log("Returning success with data:", responseData);

    return {
      success: true,
      message: "PDF summary generated successfully",
      data: responseData,
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

/**
 * Save summary into Neon DB
 */
async function savePdfSummaryToDatabase({
  userID,
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryResponse) {
  console.log("Saving to database:", {
    userID,
    fileUrl,
    summary: summary.substring(0, 100) + "...",
    title,
    fileName,
  });

  try {
    const sql = await getDbconnection();

    const result = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        status,
        title,
        file_name,
        created_at
      ) VALUES (
        ${userID},
        ${fileUrl},
        ${summary},
        'completed',
        ${title},
        ${fileName},
        NOW()
      )
      RETURNING *
    `;

    console.log("Database insert result:", result);

    if (!result || result.length === 0) {
      throw new Error("Failed to insert summary into database");
    }

    return result[0];
  } catch (error) {
    console.error("Error saving PDF Summary to database:", error);
    throw error;
  }
}

/**
 * Store summary in DB after generation
 */
export async function storePdfSummary({
  userID,
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryResponse): Promise<StorePdfSummaryResult> {
  console.log("storePdfSummary called with:", {
    userID,
    fileUrl,
    title,
    fileName,
  });

  try {
    // ✅ Clerk auth check
    const authResult = await auth();
    const authenticatedUserId = authResult?.userId;

    console.log("Auth result:", {
      authenticatedUserId,
      providedUserID: userID,
    });

    if (!authenticatedUserId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const savedSummary = await savePdfSummaryToDatabase({
      userID: authenticatedUserId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again...",
      };
    }

    // Revalidate cache
    revalidatePath(`/summaries/${savedSummary.id}`);
    console.log("PDF summary saved successfully to database");

    return {
      success: true,
      message: "PDF Summary saved successfully",
      data: {
        id: savedSummary.id,
      },
    };
  } catch (error) {
    console.error("Store Summary Error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF Summary",
    };
  }
}
