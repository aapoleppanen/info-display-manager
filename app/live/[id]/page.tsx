import { getApartment, getResidents } from "@/app/db"
import Preview from "@/app/preview/Preview"
import { ResidentRow } from "@/app/types"
import { sql } from "@vercel/postgres"

export const dynamic = 'force-static'
export const revalidate = false

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default async function Live({ params }: { params: { id: string } }) {
  const residents = await getResidents(params.id)
  const apartment = await getApartment(params.id)

  return <Preview residents={residents as ResidentRow[]} apartment={apartment} />
}
