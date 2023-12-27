import { ApartmentConfig, ResidentRow } from "./types";

export const residentRowsToApartmentConfig = (rows: ResidentRow[]): ApartmentConfig => {
  const config: ApartmentConfig = {};

  rows.forEach((row) => {
    const { floor_number, resident_name, house_number } = row;

    if (!config[floor_number]) config[floor_number] = [];

    config[floor_number].push({
      resident_name,
      house_number,
    });
  });

  return config;
}
