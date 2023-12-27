import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE Residents (
        id SERIAL PRIMARY KEY,
        resident_name VARCHAR(255) NOT NULL,
        house_number VARCHAR(255) NOT NULL,
        floor_number INTEGER NOT NULL,
        apartment_id INTEGER NOT NULL
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
