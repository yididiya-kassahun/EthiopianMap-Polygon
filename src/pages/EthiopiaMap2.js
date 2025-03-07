import React, { useEffect, useState } from "react";
import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";
import "./MapStyle.css";

const EthiopiaMap2 = ({ regionsData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null); // State for selected region info

  useEffect(() => {
    regionsData.forEach(({ regionName, data, title }) => {
      const regionElement = document.getElementById(regionName);
      if (regionElement) {
        const color = getColorBasedOnData(data);
        regionElement.style.fill = color;

        // Mouse move: Update tooltip position
        regionElement.addEventListener("mousemove", (e) => {
         
        });

      }
    });
  }, [regionsData]);

  const getColorBasedOnData = (data) => {
    if (data >= 90) return "#FF0000"; // Red
    if (data >= 80) return "#FF4500"; // Orange-Red
    if (data >= 70) return "#FF5733"; // Orange
    if (data >= 60) return "#FFC300"; // Yellow-Orange
    if (data >= 50) return "#FFD700"; // Yellow
    if (data >= 40) return "#ADFF2F"; // Green-Yellow
    if (data >= 30) return "#32CD32"; // Lime Green
    if (data >= 20) return "#008000"; // Green
    if (data >= 10) return "#006400"; // Dark Green
    return "#2E7D76"; // Default
  };

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
