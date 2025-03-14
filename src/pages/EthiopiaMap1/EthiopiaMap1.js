import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "../MapStyle.css";

import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";

const regionsData = [
  { title: "Population", data: 85, regionName: "oromiya" },
  { title: "Population", data: 65, regionName: "amhara" },
  { title: "Population", data: 22, regionName: "tigray" },
  { title: "Population", data: 56, regionName: "afar" },
  { title: "Population", data: 45, regionName: "addisababa" },
  { title: "Population", data: 33, regionName: "snpr" },
  { title: "Population", data: 13, regionName: "harar" },
  { title: "Population", data: 95, regionName: "somalia" },
  { title: "Population", data: 58, regionName: "gambella" },
  { title: "Population", data: 5,  regionName: "benishangul" },
  { title: "Population", data: 75, regionName: "sidama" },
  { title: "Population", data: 75, regionName: "dire" },
];

const EthiopiaMap1 = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    const regionElements = {};

    regionsData.forEach(({ regionName, data, title }) => {
      const regionElement = document.getElementById(regionName);
      if (regionElement) {
        const color = getColorBasedOnData(data);
        regionElement.style.fill = color;

        // Store event listeners in an object for cleanup later
        const handleMouseEnter = () => {
          setSelectedRegion({ title, regionName, data, color });
        };

        regionElement.addEventListener("mouseenter", handleMouseEnter);
        regionElements[regionName] = handleMouseEnter;
      }
    });

    return () => {
      Object.entries(regionElements).forEach(([regionName, handler]) => {
        const regionElement = document.getElementById(regionName);
        if (regionElement) {
          regionElement.removeEventListener("mouseenter", handler);
        }
      });
    };
  }, []); 

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
          title={selectedRegion.title}
          style={{
            marginTop: "20px",
            width: 400,
            textAlign: "left",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <strong>Type: {selectedRegion.title}</strong>
          <p>
            <strong>Region:</strong> {selectedRegion.regionName}
          </p>
          <strong>Data:</strong> {selectedRegion.data}
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
      <Card
        style={{
          marginTop: "20px",
          width: 400,
          textAlign: "left",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Regions</h2>
        <div className="map-legend">
          <p>lorem</p>
        </div>
      </Card>
    </div>
  );
};

export default EthiopiaMap1;
