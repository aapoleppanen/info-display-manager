import { ApartmentConfig, ResidentRow } from "../types";
import { residentRowsToApartmentConfig } from "../utils";
import PreviewClasses from "./Preview.module.css";

type Props = {
  residents: ResidentRow[];
};

const Preview = ({ residents }: Props) => {
  const config = residentRowsToApartmentConfig(residents)

  return (
    <div className={PreviewClasses.container}>
      <div className={PreviewClasses.apartmentDescription}>
      AS OY TUSULAN <br/>
      PÄÄVARTIO <br/>
      Kaartilaisenpolku 4 A
      </div>
      {Object.entries(config).map(([floor, residentInfo]) => (
        <div className={PreviewClasses.floorContainer} key={floor}>
          <div className={PreviewClasses.floorHeading}>{floor}</div>
          {residentInfo.map(({ resident_name, house_number }) => (
            <div className={PreviewClasses.residentInfo} key={house_number}>
              <div>{house_number}</div>
              <div>{resident_name}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Preview;
