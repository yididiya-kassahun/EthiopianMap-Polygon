import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { ReactComponent as EthiopiaMaps } from "./EthiopiaMap.svg";
import "./MapStyle.css";

const EthiopiaMap3 = ({ regionsData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    regionsData.forEach(({ regionName, data, title }) => {
      const regionElement = document.getElementById(regionName);
      if (regionElement) {
        const color = getColorBasedOnData(data);
        regionElement.style.fill = color;

        // Click event to open modal
        regionElement.addEventListener("click", () => {
          setSelectedRegion({ regionName, title, data, color });
          form.setFieldsValue({ title, regionName, data, color });
          setModalVisible(true);
        });
      }
    });
  }, [regionsData, form]);

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

  return (
    <div className="map-container" style={{ textAlign: "center" }}>
      <EthiopiaMaps />

      <Modal
        title="Edit Region Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Region Name" name="regionName">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Data" name="data">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input type="color" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setModalVisible(false)}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EthiopiaMap3;
