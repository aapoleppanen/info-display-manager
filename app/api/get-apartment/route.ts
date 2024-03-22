
import { NextResponse } from 'next/server';
import { getApartment } from '@/app/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id required" }, { status: 500 });

  const apartment = await getApartment(id);

  return NextResponse.json(apartment, { status: 200 });
}
