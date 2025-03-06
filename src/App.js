import "./App.css";
import "./index.css";
import EthiopiaMap1 from "./pages/EthiopiaMap1";
import EthiopiaMap2 from "./pages/EthiopiaMap1";

const regionsData = [
  { title: "Population", data: 85, regionName: "oromiyal" },
  { title: "Population", data: 65, regionName: "amharal" },
  { title: "Population", data: 22, regionName: "tigrayl" },
  { title: "Population", data: 56, regionName: "afarl" },
  { title: "Population", data: 45, regionName: "addisababal" },
  { title: "Population", data: 33, regionName: "snprl" },
  { title: "Population", data: 13, regionName: "hararl" },
  { title: "Population", data: 95, regionName: "somalial" },
  { title: "Population", data: 58, regionName: "gambellal" },
  { title: "Population", data: 5,  regionName: "benishangull" },
];

function App() {
  return (
    <div className="App flex flex-row space-x-60 justify-center">
      <EthiopiaMap1 regionsData={regionsData} />
      <EthiopiaMap2 regionsData={regionsData} />
    </div>
  );
}

export default App;
