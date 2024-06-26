import { cache } from "react";
import { ApartmentRow, ResidentRow } from "./types";
import { sql } from "@vercel/postgres";

export const getResidents = async (apartmentId?: string) => {
  if (apartmentId && !isNaN(Number(apartmentId))) {
    const { rows: residents } = await sql<ResidentRow>`
      SELECT * FROM residents WHERE apartment_id = ${apartmentId} ORDER BY floor_number, substring(house_number FROM '([0-9]+)')::int DESC
    `;

    return residents;
  }

  const { rows: residents } = await sql<ResidentRow>`
    SELECT * FROM residents ORDER BY floor_number, substring(house_number FROM '([0-9]+)')::int DESC
  `;

  return residents;
}


export const getApartment = async (apartmentId: string) => {
  const { rows: [apartment] } = await sql<ApartmentRow>`
    SELECT * FROM apartments WHERE id = ${apartmentId}
  `;

  return apartment;
}
