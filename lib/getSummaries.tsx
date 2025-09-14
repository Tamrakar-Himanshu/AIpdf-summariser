import { getDbconnection } from "./db";

export async function getSummaries(userId: string) {
  // Replace with actual data fetching logic
  const sql = await getDbconnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC `;
  return summaries;
}
