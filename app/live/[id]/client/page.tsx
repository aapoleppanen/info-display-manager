"use client";

import React, { useEffect, useState } from "react";
import Preview from "@/app/preview/Preview";
import { ApartmentRow, ResidentRow } from "@/app/types";

export default function Live({ params }: { params: { id: string } }) {
  const [residents, setResidents] = useState<ResidentRow[]>([]);
  const [apartment, setApartment] = useState<ApartmentRow>({
    description: "",
    description_line_2: "",
    address: "",
    id: Number(params.id),
  });

  useEffect(() => {
    async function fetchData() {
      const residentsUrl = new URL("/api/get-residents", window.location.href);
      residentsUrl.searchParams.append("id", params.id);
      const residentsResponse = await fetch(residentsUrl.href);
      const apartmentUrl = new URL("/api/get-apartment", window.location.href);
      apartmentUrl.searchParams.append("id", params.id);
      const apartmentResponse = await fetch(apartmentUrl.href);
      const residentsData = await residentsResponse.json();
      const apartmentData = await apartmentResponse.json();

      setResidents(residentsData);
      setApartment(apartmentData);
    }

    fetchData(); // Fetch data on component mount

    const interval = setInterval(fetchData, 10800000); // Refresh every 3 hours
    return () => clearInterval(interval); // Cleanup on unmount
  }, [params.id]); // Re-run when the id changes

  return <Preview residents={residents} apartment={apartment} />;
}
