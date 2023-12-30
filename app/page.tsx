import { sql } from '@vercel/postgres'
import Config from './config/Config'
import { ResidentRow } from './types'
import { getPageSession } from '@/auth/lucia';
import { redirect } from 'next/navigation';
import { getResidents } from './db';

export default async function Home() {
  const session = await getPageSession();
	if (!session) redirect("/login");

  const residents = await getResidents()

  return <Config residents={residents as ResidentRow[]} />
}
