import { sql } from '@vercel/postgres'
import Config from './config/Config'
import { ResidentRow } from './types'
import { getPageSession } from '@/auth/lucia';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getPageSession();
	if (!session) redirect("/login");

  const { rows: residents } = await sql`SELECT * FROM Residents`

  return <Config residents={residents as ResidentRow[]} />
}
