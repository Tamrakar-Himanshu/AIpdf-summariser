"use server";

import { getDbconnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary(summaryID: string) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!user?.id) {
      throw Error("User Not Found");
    }
    const sql = await getDbconnection();

    const res =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryID} AND user_id = ${userId} RETURNING id`;

    if (res.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }
    return { success: false, error: "Summary not found or not authorized" };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return { success: false };
  }
}
