import { cache } from "react";
import { ResidentRow } from "./types";
import { sql } from "@vercel/postgres";

export const getResidents = cache(async () => {
  const { rows: residents } = await sql<ResidentRow>`
    SELECT * FROM residents ORDER BY floor_number, house_number
  `;

  return residents;
})
