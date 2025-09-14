import { getDbconnection } from "@/lib/db";

export async function finalSummary(id: string) {
  try {
    const sql = await getDbconnection();

    const result = await sql`
      SELECT
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        created_at,
        updated_at,
        status,
        file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 AS calculated_word_count
      FROM pdf_summaries
      WHERE id = ${id}
    `;

    return result.map((row) => ({
      ...row,
      word_count: row.calculated_word_count, // normalize field
    }));
  } catch (error) {
    console.error("Error fetching summary:", error);
    return null;
  }
}
