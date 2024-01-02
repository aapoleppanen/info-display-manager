import React, { useState } from "react";
import {
  Button,
  TextInput,
  Divider,
  NumberInput,
  Flex,
  Box,
} from "@mantine/core";
import { ResidentRow } from "../types";
import { groupResidentsRowsByFloor } from "../utils";
import CssClasses from "./Components.module.css";

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
  const groupedResidents = groupResidentsRowsByFloor(residents);
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
    const editId = residents.findIndex((r) => r.id === editedResident.id);
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
      editedResident.house_number === residents[editId!].house_number &&
      editedResident.resident_name === residents[editId!].resident_name &&
      editedResident.floor_number === residents[editId!].floor_number
    ) {
      newErrors.houseNumber = "No changes detected";
      newErrors.residentName = "No changes detected";
      newErrors.floor = "No changes detected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEdit = (resident: ResidentRow) => {
    setEditedResident(resident);
  };

  const saveEdit = () => {
    if (validateInputs()) {
      if (editedResident.id === -1) return;
      updateResident(editedResident);
      setEditedResident({ id: -1 });
    }
  };

  const cancelEdit = () => {
    setEditedResident({ id: -1 });
    setErrors({});
  };

  return (
    <>
      {Object.entries(groupedResidents).map(([floor, residentsOnFloor]) => (
        <div key={floor}>
          <h3>Floor {floor}</h3>
          {residentsOnFloor.map((resident) => (
            <Flex
              direction={{ base: "column", sm: "row" }}
              align={{ sm: "center", md: "end" }}
              justify={{ md: "start" }}
              gap="xs"
              key={resident.id}
              mb={{ base: 25, sm: 10 }}
            >
              {resident.id === editedResident.id && editedResident.id !== -1 ? (
                <>
                  <TextInput
                    value={editedResident.house_number || ""}
                    onChange={(e) =>
                      setEditedResident({
                        ...editedResident,
                        house_number: e.target.value,
                      })
                    }
                    placeholder="House Number"
                    label="House Number"
                    size="xs"
                    error={errors.houseNumber}
                  />
                  <TextInput
                    value={editedResident.resident_name || ""}
                    onChange={(e) =>
                      setEditedResident({
                        ...editedResident,
                        resident_name: e.target.value,
                      })
                    }
                    placeholder="Resident Name"
                    label="Resident Name"
                    size="xs"
                    error={errors.residentName}
                  />
                  <NumberInput
                    value={editedResident.floor_number || 1}
                    onChange={(value) =>
                      setEditedResident({
                        ...editedResident,
                        floor_number: Number(value),
                      })
                    }
                    placeholder="Floor Number"
                    label="Floor Number"
                    size="xs"
                    error={errors.floor}
                    min={1}
                    allowDecimal={false}
                  />
                  <Button
                    size="xs"
                    onClick={saveEdit}
                    className={CssClasses.residentListButton}
                  >
                    Save
                  </Button>
                  <Button size="xs" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Box>
                    {`House Number: ${resident.house_number}, Resident: ${resident.resident_name}`}
                  </Box>
                  <Button
                    size="xs"
                    onClick={() => startEdit(resident)}
                    className={CssClasses.residentListButton}
                  >
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
            </Flex>
          ))}
          <Divider />
        </div>
      ))}
    </>
  );
};

export default ResidentList;
