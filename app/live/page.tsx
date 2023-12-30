import { sql } from "@vercel/postgres"
import Preview from "../preview/Preview"
import { ResidentRow } from "../types"
import { getResidents } from "../db"

export const dynamic = 'force-static'
export const revalidate = false

export default async function Live() {
  const residents = await getResidents()

  return <Preview residents={residents as ResidentRow[]} />
}
