import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const residentName = searchParams.get('residentName');
  const houseNumber = searchParams.get('houseNumber');
  const floorNumber = searchParams.get('floorNumber');
  const apartmentId = searchParams.get('apartmentId') || 1;

  try {
    if (!residentName || !houseNumber || !floorNumber) throw new Error('Resident name, house number, and floor number required');
    await sql`INSERT INTO Residents (resident_name, house_number, floor_number, apartment_id) VALUES (${residentName}, ${houseNumber}, ${floorNumber}, ${apartmentId});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const residents = await sql`SELECT * FROM Residents;`;
  revalidatePath('/live');
  return NextResponse.json({ residents }, { status: 200 });
}
