import { getResidents } from '@/app/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id required" }, { status: 500 });

  const residents = await getResidents(id);

  return NextResponse.json(residents, { status: 200 });
}
