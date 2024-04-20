import { getApartment, getResidents } from "@/app/db";
import Preview from "@/app/preview/Preview";
import { ResidentRow } from "@/app/types";
import Script from "next/script";

export const dynamic = "force-static";
export const revalidate = 60 * 60 * 24;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export default async function Live({ params }: { params: { id: string } }) {
  const residents = await getResidents(params.id);
  const apartment = await getApartment(params.id);

  return (
    <>
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="pragma" content="no-cache" />
      <meta httpEquiv="expires" content="0" />
      <Script strategy="beforeInteractive" id="reload-script">{`
        const calculateReloadTime = () => {
          const now = new Date();
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(3, 0, 0, 0); // Set to reload at 3 AM
          return tomorrow.getTime() - now.getTime();
        };

        const timeUntil2am = calculateReloadTime();
        localStorage.setItem('reloadTime', new Date().getTime() + timeUntil2am);

        setTimeout(() => window.location.reload(), timeUntil2am - 7200000); // 1AM

        setInterval(() => {
          const reloadTime = parseInt(localStorage.getItem('reloadTime'), 10);
          const now = new Date().getTime() + 300000;
          if (now >= reloadTime) {
            window.location.reload();
          }
        }, 3600000); // Check every hour (3600000 ms)
      `}</Script>
      <Preview residents={residents as ResidentRow[]} apartment={apartment} />
    </>
  );
}
