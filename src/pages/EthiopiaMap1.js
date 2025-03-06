import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";
import "./MapStyle.css";

const MapComponent = ({ regionsData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    regionsData.forEach(({ regionName, data, title }) => {
      const regionElement = document.getElementById(regionName);
      if (regionElement) {
        const color = getColorBasedOnData(data);
        regionElement.style.fill = color;

        // Mouse enter: Update selected region
        regionElement.addEventListener("mouseenter", () => {
          setSelectedRegion({ name: title, data, color });
        });
      }
    });
  }, [regionsData]);

  const getColorBasedOnData = (data) => {
    if (data >= 90) return "#FF8800";
    if (data >= 80) return "#FF4500";
    if (data >= 70) return "#FF5733";
    if (data >= 60) return "#FFC300";
    if (data >= 50) return "#FFD700";
    if (data >= 40) return "#ADFF2F";
    if (data >= 30) return "#32CD32";
    if (data >= 20) return "#008000";
    if (data >= 10) return "#006400";
    return "#2E7D76";
  };

  return (
    <div
      className="map-container"
      style={{ position: "relative", textAlign: "center" }}
    >
      <EthiopiaMaps />

      {/* Selected Region Info Display */}
      {selectedRegion && (
        <Card
          title={selectedRegion.name}
          style={{
            marginTop: "20px",
            width: 300,
            textAlign: "left",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>
            <strong>Data:</strong> {selectedRegion.data}
          </p>
          <div
            style={{
              width: "100px",
              height: "20px",
              backgroundColor: selectedRegion.color,
              borderRadius: "5px",
              border: "1px solid #000",
            }}
          ></div>
        </Card>
      )}
    </div>
  );
};

export default MapComponent;
