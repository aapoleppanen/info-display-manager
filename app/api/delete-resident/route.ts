import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const residentId = searchParams.get('id');

  try {
    if (!residentId) throw new Error('Resident ID required');
    await sql`DELETE FROM Residents WHERE id=${residentId};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
