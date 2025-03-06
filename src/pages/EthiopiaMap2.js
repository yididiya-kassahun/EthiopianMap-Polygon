import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";
import "./MapStyle.css";

const MapComponent = ({ regionsData }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });
  const [selectedRegion, setSelectedRegion] = useState(null); // State for selected region info

  useEffect(() => {
    regionsData.forEach(({ regionName, data, title }) => {
      const regionElement = document.getElementById(regionName);
      if (regionElement) {
        const color = getColorBasedOnData(data);
        regionElement.style.fill = color;

        // Mouse enter: Show tooltip & update selected region
        regionElement.addEventListener("mouseenter", (e) => {
          setTooltip({
            visible: true,
            text: `${title}: ${data}`,
            x: e.clientX,
            y: e.clientY,
          });

          setSelectedRegion({ name: title, data, color });
        });

        // Mouse move: Update tooltip position
        regionElement.addEventListener("mousemove", (e) => {
          setTooltip((prev) => ({
            ...prev,
            x: e.clientX,
            y: e.clientY,
          }));
        });

        // Mouse leave: Hide tooltip
        regionElement.addEventListener("mouseleave", () => {
          setTooltip((prev) => ({ ...prev, visible: false }));
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

      {/* Custom tooltip that follows the mouse */}
      {tooltip.visible && (
        <Tooltip title={tooltip.text} visible>
          <div
            style={{
              position: "absolute",
              left: tooltip.x + 10,
              top: tooltip.y + 10,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              pointerEvents: "none",
            }}
          >
            {tooltip.text}
          </div>
        </Tooltip>
      )}

      {/* Selected Region Info Display */}
      {selectedRegion && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          <h3>{selectedRegion.name}</h3>
          <p>Data: {selectedRegion.data}</p>
          <div
            style={{
              width: "50px",
              height: "20px",
              backgroundColor: selectedRegion.color,
              margin: "auto",
              border: "1px solid #000",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
