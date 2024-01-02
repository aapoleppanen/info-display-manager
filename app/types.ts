export type ResidentRow = {
  id: number;
  resident_name: string;
  house_number: string;
  floor_number: number;
  apartment_id?: number;
};

export type ApartmentRow = {
  id: number;
  description: string;
  description_line_2: string;
  address: string;
};

export type ResidentInfo = Pick<ResidentRow, 'house_number' | 'resident_name' | 'floor_number'>;

export type ApartmentConfig = {
  [FloorNumber: number]: Pick<ResidentRow, 'resident_name' | 'house_number'>[];
}
