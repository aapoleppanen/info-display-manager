import { ApartmentConfig, ApartmentRow, ResidentRow } from "../types";
import { residentRowsToApartmentConfig } from "../utils";
import PreviewClasses from "./Preview.module.css";

type Props = {
  residents: ResidentRow[];
  apartment: ApartmentRow;
};

const Preview = ({ apartment, residents }: Props) => {
  const config = residentRowsToApartmentConfig(residents)

  return (
    <div className={PreviewClasses.container}>
      <div className={PreviewClasses.apartmentDescription}>
      {apartment.description} <br />
      {apartment.description_line_2} <br />
      {apartment.address}
      </div>
      {Object.entries(config).reverse().map(([floor, residentInfo]) => (
        <div className={PreviewClasses.floorContainer} key={floor}>
          <div className={PreviewClasses.floorHeading}>{floor}</div>
          {residentInfo.map(({ resident_name, house_number }) => (
            <div className={PreviewClasses.residentInfo} key={house_number}>
              <div className={PreviewClasses.residentHousenumber}>{house_number}</div>
              <div className={PreviewClasses.residentName}>{resident_name}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Preview;
