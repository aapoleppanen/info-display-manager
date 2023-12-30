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

export const groupResidentsRowsByFloor = (rows: ResidentRow[]) => {
  return rows.reduce((acc, resident) => {
    const { floor_number } = resident;
    acc[floor_number] = acc[floor_number] || [];
    acc[floor_number].push(resident);
    return acc;
  }, {} as Record<number, ResidentRow[]>);
}
