import React from "react";
import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";
import "../MapStyle.css";

const EthiopiaMap2 = () => {
 // const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div
      className="map-container"
      style={{ position: "relative", textAlign: "center" }}
    >
      <EthiopiaMaps />
    </div>
  );
};

export default EthiopiaMap2;
