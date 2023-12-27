export type ResidentRow = {
  id: number;
  resident_name: string;
  house_number: string;
  floor_number: number;
  apartment_id?: number;
};

export type ResidentInfo = Pick<ResidentRow, 'house_number' | 'resident_name' | 'floor_number'>;

export type ApartmentConfig = {
  [FloorNumber: number]: Pick<ResidentRow, 'resident_name' | 'house_number'>[];
}
