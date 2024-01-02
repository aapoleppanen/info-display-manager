import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id required" }, { status: 500 });

  // fetch apartment
  const { rows: apartments } =
    await sql`SELECT * FROM Apartments WHERE id = ${id};`;

  if (!apartments.length)
    return NextResponse.json({ error: "apartment not found" }, { status: 500 });

  const apartment = apartments[0];

  // update fields present in request
  const description = (searchParams.get("description") || "").replace(
    /\+/g,
    " "
  );
  const description_line_2 = (
    searchParams.get("descriptionLine2") || ""
  ).replace(/\+/g, " ");
  const address = (searchParams.get("address") || "").replace(/\+/g, " ");

  if (description) apartment.description = description;
  if (description_line_2) apartment.description_line_2 = description_line_2;
  if (address) apartment.address = address;

  // update resident
  try {
    await sql`UPDATE Apartments
    SET description = ${apartment.description},
    address = ${apartment.address},
    description_line_2 = ${apartment.description_line_2}
    WHERE id = ${id};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // fetch updated apartment
  const { rows: updatedApartments } =
    await sql`SELECT * FROM Apartments WHERE id = ${id};`;
  revalidatePath(`/live/${id}`);

  return NextResponse.json({ resident: updatedApartments[0] }, { status: 200 });
}
