import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Card, Select, Row } from "antd";
import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";
import "../MapStyle.css";
import regionsDataJson from "./regions.json";

const { Option } = Select;

const EthiopiaMap3 = () => {
  const [regions, setRegions] = useState([]);
  const [submittedRegions, setSubmittedRegions] = useState([]); // Store only submitted regions
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setRegions(regionsDataJson.data);
  }, []);

 const handleRegionClick = (event) => {
   const regionName = event.target.id;
   console.log("Clicked region:", regionName); // Debugging step

   const existingRegion = regions.find((r) => r.regionName === regionName);
   console.log("Matched region:", existingRegion); // Debugging step

   const color = existingRegion ? existingRegion.color : "#000000";

   form.setFieldsValue({ title: "", regionName, data: "", color }
   );

   setModalVisible(true);
 };


  const handleSave = () => {
    form.validateFields().then((values) => {
      // Remove the region if it was previously submitted
      const updatedSubmittedRegions = submittedRegions.filter(
        (r) => r.regionName !== values.regionName
      );

      // Add the newly submitted region
      updatedSubmittedRegions.push(values);
      setSubmittedRegions(updatedSubmittedRegions);
      setModalVisible(false);
    });
  };

  // Effect to update the map colors when submitted regions change
  useEffect(() => {
    submittedRegions.forEach(({ regionName, color }) => {
      const regionElement = document.getElementById(regionName);
      if (regionElement) {
        regionElement.style.fill = color;
      }
    });
  }, [submittedRegions]);

  return (
    <div className="map-container" style={{ textAlign: "center" }}>
      <EthiopiaMaps onClick={handleRegionClick} />

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
          <Form.Item
            label="Region Name"
            name="regionName"
            rules={[{ required: true, message: "Region is required" }]}
          >
            <Select
              placeholder="Select a region"
              onChange={(value) => form.setFieldValue("regionName", value)}
            >
              {regions.map((region) => (
                <Option key={region.regionName} value={region.regionName}>
                  {region.regionName.replace(/3$/, "")}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Data"
            name="data"
            rules={[{ required: true, message: "Data is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input type="color" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {submittedRegions.map(({ title, regionName, data, color }) => (
          <Card
            key={regionName}
            className="flex shadow-lg rounded-lg border-l-8 p-4 mt-10"
            style={{ borderLeftColor: color, marginTop: "10px" }}
          >
            <Row gutter={24} align="middle gap-10">
              <p className="text-lg font-semibold text-gray-800">{title}</p>
              <p className="text-sm text-gray-600">
                <strong>Region:</strong> {regionName.replace(/3$/, "")}
              </p>
              <p className="flex items-center gap-2">
                <strong>Data:</strong>
                <span className="inline-block rounded-md w-8 h-4 shadow">
                  {data}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <strong>Color:</strong>
                <span
                  className="inline-block rounded-md w-8 h-4 shadow"
                  style={{ background: color }}
                ></span>
              </p>
            </Row>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EthiopiaMap3;
