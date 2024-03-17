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
      newErrors.floor = "Syötä kelvollinen kerrosnumero";
    }
    if (!editedResident.house_number?.trim()) {
      newErrors.houseNumber = "Talonumero ei voi olla tyhjä";
    }
    if (!editedResident.resident_name?.trim()) {
      newErrors.residentName = "Asukkaan nimi ei voi olla tyhjä";
    }
    if (
      editedResident.house_number === residents[editId!].house_number &&
      editedResident.resident_name === residents[editId!].resident_name &&
      editedResident.floor_number === residents[editId!].floor_number
    ) {
      newErrors.houseNumber = "Ei muutoksia havaittu";
      newErrors.residentName = "Ei muutoksia havaittu";
      newErrors.floor = "Ei muutoksia havaittu";
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
    <h2>Muokkaa asukkaita</h2>
      {Object.entries(groupedResidents).map(([floor, residentsOnFloor]) => (
        <div key={floor}>
          <h3>Kerros {floor}</h3>
          {residentsOnFloor.map((resident) => (
            <Flex
              direction={{ base: "column", sm: "row" }}
              align={{ sm: "center", md: "start" }}
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
                    placeholder="Talonumero"
                    label="Talonumero"
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
                    placeholder="Asukkaan nimi"
                    label="Asukkaan nimi"
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
                    placeholder="Kerros"
                    label="Kerros"
                    size="xs"
                    error={errors.floor}
                    min={1}
                    allowDecimal={false}
                  />
                  <Button
                    size="xs"
                    onClick={saveEdit}
                    className={CssClasses.residentListButton}
                    mt={24}
                  >
                    Tallenna
                  </Button>
                  <Button size="xs" onClick={cancelEdit} mt={24}>
                    Peruuta
                  </Button>
                </>
              ) : (
                <>
                  <Box>
                    {`Talonumero: ${resident.house_number}, Asukas: ${resident.resident_name}`}
                  </Box>
                  <Button
                    size="xs"
                    onClick={() => startEdit(resident)}
                    className={CssClasses.residentListButton}
                  >
                    Muokkaa
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => deleteResident(resident.id)}
                  >
                    Poista
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
