import { sql } from '@vercel/postgres'
import { getPageSession } from '@/auth/lucia';
import { redirect } from 'next/navigation';
import { getApartment, getResidents } from '../db';
import { ResidentRow } from '../types';
import Config from '../config/Config';


export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default async function Home({ params }: { params: { id: string } }) {
  const session = await getPageSession();
	if (!session) redirect("/login");

  const residents = await getResidents(params.id)
  const apartment = await getApartment(params.id)

  return <Config residents={residents as ResidentRow[]} apartment={apartment} />
}
