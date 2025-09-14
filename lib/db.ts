// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getDbconnection() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL is not set");

  const sql = neon(dbUrl);

  return sql;
}
