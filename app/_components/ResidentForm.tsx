import React, { useState } from 'react';
import { Button, TextInput, NumberInput, Box, Flex } from '@mantine/core';
import { ResidentInfo, ResidentRow } from '../types';

type ResidentFormProps = {
  addResident: (resident: ResidentInfo) => void;
};

const ResidentForm: React.FC<ResidentFormProps> = ({ addResident }) => {
  const [resident, setResident] = useState<ResidentInfo>({ resident_name: '', house_number: '', floor_number: 1 });
  const [errors, setErrors] = useState<{ floor?: string; houseNumber?: string; residentName?: string }>({});

  const validateInputs = () => {
    const newErrors: { floor?: string; houseNumber?: string; residentName?: string } = {};
    if (!resident.floor_number || resident.floor_number < 1) {
      newErrors.floor = 'Please enter a valid floor number';
    }
    if (!resident.house_number.trim()) {
      newErrors.houseNumber = 'House number cannot be empty';
    }
    if (!resident.resident_name.trim()) {
      newErrors.residentName = 'Resident name cannot be empty';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      addResident(resident);
      setResident({ resident_name: '', house_number: '', floor_number: 1 });
    }
  };

  return (
    <Flex justify="flex-start" align="flex-start" gap="md" wrap="wrap" >
      <Box w={75}>
      <NumberInput
        label="Kerros"
        placeholder="Kerros"
        value={resident.floor_number}
        onChange={(value) => setResident({ ...resident, floor_number: Number(value) })}
        min={1}
        error={errors.floor}
        allowDecimal={false}
      />
      </Box>
      <TextInput
        label="Talonumero"
        placeholder="Talonumero"
        value={resident.house_number}
        onChange={(e) => setResident({ ...resident, house_number: e.target.value })}
        error={errors.houseNumber}
      />
      <TextInput
        label="Asukkaan nimi"
        placeholder="Asukkaan nimi"
        value={resident.resident_name}
        onChange={(e) => setResident({ ...resident, resident_name: e.target.value })}
        error={errors.residentName}
      />
      <Button onClick={handleSubmit} mt={24}>
        Lisää asukas
      </Button>
    </Flex >
  );
};

export default ResidentForm;
