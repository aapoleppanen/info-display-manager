import React, { useState } from "react";
import { TextInput, Button, Group, em, Flex, Collapse } from "@mantine/core";
import { ApartmentRow } from "../types";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import CssClasses from "./Components.module.css";

type Props = {
  apartment: ApartmentRow;
};

const ApartmentConfig = ({ apartment }: Props) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [editedApartment, setEditedApartment] = useState<
    Partial<ApartmentRow> & { id: number }
  >(apartment);

  const updateApartment = async (
    apartment: Partial<ApartmentRow> & { id: number }
  ) => {
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
  };

  const saveChanges = () => {
    updateApartment(editedApartment);
  };

  return (
    <div>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        onClick={toggle}
         pr="md"
         className={CssClasses.apartmentConfigTitle}
      >
        <h2>Muokkaa kerrostalon tietoja</h2>
        <IconChevronDown />
      </Flex>
      <Collapse in={opened}>
        <Flex direction="column" gap="md">
          <TextInput
            label="Taloyhtiön nimi"
            value={editedApartment.description || ""}
            onChange={(e) =>
              setEditedApartment({
                ...editedApartment,
                description: e.target.value,
              })
            }
          />
          <TextInput
            label="Taloyhtiön nimi rivi 2 (vapaaehtoinen)"
            value={editedApartment.description_line_2 || ""}
            onChange={(e) =>
              setEditedApartment({
                ...editedApartment,
                description_line_2: e.target.value,
              })
            }
          />
          <TextInput
            label="Osoite"
            value={editedApartment.address || ""}
            onChange={(e) =>
              setEditedApartment({
                ...editedApartment,
                address: e.target.value,
              })
            }
          />
          <Button onClick={saveChanges}>
            Tallenna muutokset kerrostalon tietoihin
          </Button>
        </Flex>
      </Collapse>
    </div>
  );
};

export default ApartmentConfig;
