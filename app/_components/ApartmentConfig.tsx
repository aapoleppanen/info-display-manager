import React, { useState } from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import { ApartmentRow } from "../types";

type Props = {
  apartment: ApartmentRow;
};

const ApartmentConfig = ({ apartment }: Props) => {
  const [editedApartment, setEditedApartment] = useState<Partial<ApartmentRow> & { id: number }>(apartment);

  const updateApartment = async (apartment: Partial<ApartmentRow> & { id: number }) => {
    const url = new URL("/api/edit-apartment", window.location.href);
    if (apartment.description)
      url.searchParams.append("description", apartment.description);
    if (apartment.description_line_2)
      url.searchParams.append("descriptionLine2", apartment.description_line_2);
    if (apartment.address)
      url.searchParams.append("address", apartment.address);
    url.searchParams.append("id", apartment.id.toString());

    const response = await fetch(url.href);
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
    }
  }

  const saveChanges = () => {
    updateApartment(editedApartment);
  };

  return (
    <div>
      <h3>Edit Apartment Details</h3>
      <Group grow>
        <TextInput
          label="Description"
          value={editedApartment.description || ''}
          onChange={(e) => setEditedApartment({ ...editedApartment, description: e.target.value })}
        />
        <TextInput
          label="Description Line 2"
          value={editedApartment.description_line_2 || ''}
          onChange={(e) => setEditedApartment({ ...editedApartment, description_line_2: e.target.value })}
        />
        <TextInput
          label="Address"
          value={editedApartment.address || ''}
          onChange={(e) => setEditedApartment({ ...editedApartment, address: e.target.value })}
        />
        <Button onClick={saveChanges}>Save Changes</Button>
      </Group>
    </div>
  );
};

export default ApartmentConfig;
