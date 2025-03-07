import React, { useState } from "react";
import { Tabs } from "antd";
import "./App.css";
import "./index.css";

import EthiopiaMap1 from "./pages/EthiopiaMap1/EthiopiaMap1";
import EthiopiaMap2 from "./pages/EthiopiaMap2/EthiopiaMap2";
import EthiopiaMap3 from "./pages/EthiopiaMap3/EthiopiaMap3";

function App() {
  const [regions, setRegions] = useState([]);

  const handleRegionUpdate = (updatedRegions) => {
    setRegions(updatedRegions);
  };

  const items = [
    {
      key: "1",
      label: "Ethiopia Map 1",
      children: (
        <EthiopiaMap1
          regions={regions}
          setRegions={handleRegionUpdate}
        />
      ),
    },
    {
      key: "2",
      label: "Ethiopia Map 2",
      children: (
        <EthiopiaMap2 />
      ),
    },
    {
      key: "3",
      label: "Ethiopia Map 3",
      children: (
        <EthiopiaMap3
          setRegions={handleRegionUpdate}
        />
      ),
    },
  ];

  return (
    <div className="App p-10 flex justify-center">
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
}

export default App;
