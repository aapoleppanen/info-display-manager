import { sql } from '@vercel/postgres'
import Config from './config/Config'
import { ResidentRow } from './types'

export default async function Home() {

  const { rows: residents } = await sql`SELECT * FROM Residents`

  return <Config residents={residents as ResidentRow[]} />
}
