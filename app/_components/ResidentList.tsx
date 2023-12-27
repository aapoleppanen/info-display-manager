import React, { useState } from "react";
import { Group, Button, TextInput } from "@mantine/core";
import { ResidentRow } from "../types";

type Props = {
  residents: ResidentRow[];
  updateResident: (resident: Partial<ResidentRow> & { id: number }) => void;
  deleteResident: (id: number) => void;
};

const ResidentList: React.FC<Props> = ({
  residents,
  updateResident,
  deleteResident,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedResident, setEditedResident] = useState<
    Partial<ResidentRow> & { id: number }
  >({ id: -1 });
  const [errors, setErrors] = useState<{
    floor?: string;
    houseNumber?: string;
    residentName?: string;
  }>({});

  const validateInputs = () => {
    const newErrors: {
      floor?: string;
      houseNumber?: string;
      residentName?: string;
    } = {};
    if (!editedResident.floor_number || editedResident.floor_number < 1) {
      newErrors.floor = "Please enter a valid floor number";
    }
    if (!editedResident.house_number?.trim()) {
      newErrors.houseNumber = "House number cannot be empty";
    }
    if (!editedResident.resident_name?.trim()) {
      newErrors.residentName = "Resident name cannot be empty";
    }
    if (
      editedResident.house_number === residents[editIndex!].house_number &&
      editedResident.resident_name === residents[editIndex!].resident_name
    ) {
      newErrors.houseNumber = "No changes detected";
      newErrors.residentName = "No changes detected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEdit = (index: number, resident: ResidentRow) => {
    setEditIndex(index);
    setEditedResident(resident);
  };

  const saveEdit = () => {
    if (validateInputs()) {
      if (editedResident.id === -1) return;
      updateResident(editedResident);
      setEditIndex(null);
      setEditedResident({ id: -1 });
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedResident({ id: -1 });
    setErrors({});
  };

  return (
    <>
      {residents.map((resident, index) => (
        <Group key={index}>
          {editIndex === index ? (
            <>
              <TextInput
                value={editedResident.house_number}
                onChange={(e) =>
                  setEditedResident({
                    ...editedResident,
                    house_number: e.target.value,
                  })
                }
                placeholder="House Number"
                size="xs"
                error={errors.houseNumber}
              />
              <TextInput
                value={editedResident.resident_name}
                onChange={(e) =>
                  setEditedResident({
                    ...editedResident,
                    resident_name: e.target.value,
                  })
                }
                placeholder="Resident Name"
                size="xs"
                error={errors.residentName}
              />
              <Button size="xs" onClick={saveEdit}>
                Save
              </Button>
              <Button size="xs" onClick={cancelEdit}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <span>{`House Number: ${resident.house_number}, Resident: ${resident.resident_name}`}</span>
              <Button size="xs" onClick={() => startEdit(index, resident)}>
                Edit
              </Button>
              <Button
                size="xs"
                color="red"
                onClick={() => deleteResident(resident.id)}
              >
                Delete
              </Button>
            </>
          )}
        </Group>
      ))}
    </>
  );
};

export default ResidentList;
