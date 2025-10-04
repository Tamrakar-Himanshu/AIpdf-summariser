import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYS_PROMPT } from "@/utils/prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// 🔹 Helper: split text into smaller chunks
function chunkText(text: string, size = 6000) {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

export const generateSummaryFromGemeni = async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    // 🔹 Break into chunks (in case PDF text is huge)
    const chunks = chunkText(pdfText);

    let summaries: string[] = [];

    for (const chunk of chunks) {
      const prompt = `${SUMMARY_SYS_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting and write atleast  50 words in each section:\n\n${chunk}`;

      const result = await model.generateContent(prompt);

      // ✅ Call text() properly
      const res = result.response?.text();

      if (res && res.trim().length > 0) {
        summaries.push(res);
      }
    }

    if (summaries.length === 0) {
      console.warn(
        "⚠️ Gemini returned an empty response. Falling back to raw text."
      );
      return `### ⚠️ Gemini returned no summary\n\nHere is the raw extracted text:\n\n${pdfText.slice(
        0,
        3000
      )}...`;
    }

    // 🔹 Join multiple chunk summaries into one
    return summaries.join("\n\n---\n\n");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `### ❌ Error generating summary\n\nFalling back to raw text:\n\n${pdfText.slice(
      0,
      3000
    )}...`;
  }
};
