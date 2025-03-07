import React, { useState } from "react";
import { Modal, Form, Input, Button, Card, Select } from "antd";
import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";
import "./MapStyle.css";

const { Option } = Select;

const EthiopiaMap3 = ({ regionsData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState(regionsData);

  console.log(regionsData);

  // Function to determine the color based on data value
  const getColorBasedOnData = (data) => {
    if (data >= 90) return "#FF0000";
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

  // Function to open modal and set the selected region
  const handleRegionClick = (event) => {
    const regionName = event.target.id; // Get region ID from SVG
    const existingRegion = regions.find((r) => r.regionName === regionName);

    setSelectedRegion(
      existingRegion || { regionName, title: "", data: "", color: "" }
    );
    form.setFieldsValue(
      existingRegion || { title: "", regionName, data: "", color: "" }
    );

    setModalVisible(true);
  };

  // Save data and update the region color
  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedRegions = regions.filter(
        (r) => r.regionName !== values.regionName
      );
      const color = getColorBasedOnData(values.data);

      const newRegion = { ...values, color };
      updatedRegions.push(newRegion);

      setRegions(updatedRegions);
      setModalVisible(false);
    });
  };

  return (
    <div className="map-container" style={{ textAlign: "center" }}>
      {/* Render the Ethiopia map and attach click handlers to all regions */}
      <EthiopiaMaps onClick={handleRegionClick} />

      {/* Apply the selected colors to the regions */}
      {regions.map(({ regionName, color }) => {
        const regionElement = document.getElementById(regionName);
        if (regionElement) {
          regionElement.style.fill = color;
        }
        return null;
      })}

      {/* Modal for editing region details */}
      <Modal
        title="Edit Region Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Region Name" name="regionName">
            <Select>
              {regionsData.map((region) => {
                <Option>{region.regionName}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Data"
            name="data"
            rules={[{ required: true, message: "Data is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="color" name="color"></Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Display selected regions' details at the bottom */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {regions.length > 0 &&
          regions.map(({ title, regionName, data, color }) => (
            <Card
              key={regionName}
              className="flex"
              style={{ marginBottom: "10px", borderLeft: `5px solid ${color}` }}
            >
              <p>
                <strong>Title:</strong> {title}
              </p>
              <p>
                <strong>Region:</strong> {regionName}
              </p>
              <p>
                <strong>Data:</strong> {data}
              </p>
              <p>
                <strong>Color:</strong>{" "}
                <span
                  style={{
                    background: color,
                    padding: "2px 10px",
                    borderRadius: "4px",
                    color: "#fff",
                  }}
                >
                  {color}
                </span>
              </p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default EthiopiaMap3;
