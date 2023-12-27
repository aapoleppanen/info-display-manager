import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id required" }, { status: 500 });

  // fetch resident
  const { rows: residents } =
    await sql`SELECT * FROM Residents WHERE id = ${id};`;

  if (!residents.length)
    return NextResponse.json({ error: "resident not found" }, { status: 500 });

  const resident = residents[0];

  // update fields present in request
  const residentName = searchParams.get("residentName");
  const houseNumber = searchParams.get("houseNumber");
  const floorNumber = searchParams.get("floorNumber");

  if (residentName) resident.resident_name = residentName;
  if (houseNumber) resident.house_number = houseNumber;
  if (floorNumber) resident.floor_number = floorNumber;

  // update resident
  try {
    await sql`UPDATE Residents SET resident_name = ${resident.resident_name}, house_number = ${resident.house_number}, floor_number = ${resident.floor_number} WHERE id = ${id};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // fetch updated resident
  const { rows: updatedResidents } =
    await sql`SELECT * FROM Residents WHERE id = ${id};`;

  return NextResponse.json({ resident: updatedResidents[0] }, { status: 200 });
}
