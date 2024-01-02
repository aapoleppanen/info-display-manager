"use client";

import { Box, SimpleGrid, em } from "@mantine/core";
import { useState } from "react";
import DeleteModal from "../_components/DeleteModal";
import ResidentForm from "../_components/ResidentForm";
import ResidentList from "../_components/ResidentList";
import Preview from "../preview/Preview";
import { ApartmentRow, ResidentInfo, ResidentRow } from "../types";
import ApartmentConfig from "../_components/ApartmentConfig";
import ConfigClasses from "./Config.module.css";
import { useMediaQuery } from "@mantine/hooks";
import FloatingButton from "../_components/FloatingButton";
import { IconEye, IconSettings } from "@tabler/icons-react";

type Props = {
  residents: ResidentRow[];
  apartment: ApartmentRow;
};

const Config = ({ residents, apartment }: Props) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const [localResidents, setLocalResidents] =
    useState<ResidentRow[]>(residents); // [ResidentRow
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);

  const addResident = async (resident: ResidentInfo) => {
    setLocalResidents([...localResidents, { ...resident, id: -1 }]);
    // GET /api/add-resident with search params
    const url = new URL("/api/add-resident", window.location.href);
    url.searchParams.append("floorNumber", resident.floor_number.toString());
    url.searchParams.append("houseNumber", resident.house_number);
    url.searchParams.append("residentName", resident.resident_name);
    url.searchParams.append("apartmentId", apartment.id.toString());

    const response = await fetch(url.href);
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      setLocalResidents(localResidents.slice(0, localResidents.length - 1));
    }

    // TODO: fix this, bit hacky
    setLocalResidents([...localResidents, data.resident]);
  };

  const editResident = async (
    resident: Partial<ResidentRow> & { id: number }
  ) => {
    const oldResident = localResidents.find((r) => r.id === resident.id);
    const newResidents = localResidents.map((r) => {
      if (r.id === resident.id) {
        return { ...r, ...resident };
      }
      return r;
    });
    setLocalResidents(newResidents);

    // GET /api/edit-resident with search params
    const url = new URL("/api/edit-resident", window.location.href);
    if (resident.floor_number)
      url.searchParams.append("floorNumber", resident.floor_number.toString());
    if (resident.house_number)
      url.searchParams.append("houseNumber", resident.house_number);
    if (resident.resident_name)
      url.searchParams.append("residentName", resident.resident_name);
    url.searchParams.append("id", resident.id.toString());

    const response = await fetch(url.href);
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      setLocalResidents(
        localResidents.map((r) => {
          if (r.id === resident.id) {
            return oldResident!;
          }
          return r;
        })
      );
    }
  };

  const deleteResident = async (id: number) => {
    const deletedResident = localResidents.find((r) => r.id === id);
    const newResidents = localResidents.filter((r) => r.id !== id);
    setLocalResidents(newResidents);
    // GET /api/delete-resident with search params
    const url = new URL("/api/delete-resident", window.location.href);
    url.searchParams.append("id", id.toString());
    url.searchParams.append("apartmentId", apartment.id.toString());

    const response = await fetch(url.href);
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      setLocalResidents([...localResidents, deletedResident!]);
    }
  };

  if (isMobile) {
    return (
      <>
        {isPreviewVisible ? (
          <div className={ConfigClasses.previewScaleWrapper}>
            <Preview residents={localResidents} apartment={apartment} />
          </div>
        ) : (
          <Box p={5} style={{ overflowY: "scroll", height: "100vh" }}>
            <ApartmentConfig apartment={apartment} />

            <h3>Add residents</h3>
            <ResidentForm addResident={addResident} />

            {localResidents.length === 0 && (
              <Box mt={10}>No residents found</Box>
            )}

            {localResidents.length > 0 && (
              <ResidentList
                residents={localResidents}
                updateResident={editResident}
                deleteResident={(id) => setDeleteModalId(id)}
              />
            )}

            <DeleteModal
              isOpen={Boolean(deleteModalId)}
              onDeleteConfirm={() => {
                if (deleteModalId) {
                  deleteResident(deleteModalId);
                }
                setDeleteModalId(null);
              }}
              onCancel={() => setDeleteModalId(null)}
            />
          </Box>
        )}
        <FloatingButton onClick={() => setIsPreviewVisible(!isPreviewVisible)}>
          {!isPreviewVisible ? <IconEye /> : <IconSettings />}
        </FloatingButton>
      </>
    );
  }

  return (
    <SimpleGrid cols={2} spacing="xs">
      <Box p={5} style={{ overflowY: "scroll", height: "100vh" }}>
        <ApartmentConfig apartment={apartment} />

        <h3>Add residents</h3>
        <ResidentForm addResident={addResident} />

        {localResidents.length === 0 && <Box mt={10}>No residents found</Box>}

        {localResidents.length > 0 && (
          <ResidentList
            residents={localResidents}
            updateResident={editResident}
            deleteResident={(id) => setDeleteModalId(id)}
          />
        )}

        <DeleteModal
          isOpen={Boolean(deleteModalId)}
          onDeleteConfirm={() => {
            if (deleteModalId) {
              deleteResident(deleteModalId);
            }
            setDeleteModalId(null);
          }}
          onCancel={() => setDeleteModalId(null)}
        />
      </Box>
      <div className={ConfigClasses.previewScaleWrapper}>
        <Preview residents={localResidents} apartment={apartment} />
      </div>
    </SimpleGrid>
  );
};

export default Config;
