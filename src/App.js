import "./App.css";
import "./index.css";
import EthiopiaMap1 from "./pages/EthiopiaMap1";
import EthiopiaMap2 from "./pages/EthiopiaMap2";
import EthiopiaMap3 from "./pages/EthiopiaMap3";

const regionsData = [
  { title: "Population", data: 85, regionName: "oromiya" },
  { title: "Population", data: 65, regionName: "amhara" },
  { title: "Population", data: 22, regionName: "tigray" },
  { title: "Population", data: 56, regionName: "afar" },
  { title: "Population", data: 45, regionName: "addisababa" },
  { title: "Population", data: 33, regionName: "snprl" },
  { title: "Population", data: 13, regionName: "harar" },
  { title: "Population", data: 95, regionName: "somalia" },
  { title: "Population", data: 58, regionName: "gambella" },
  { title: "Population", data: 5,  regionName: "benishangul" },
];

function App() {
  return (
    <div className="App flex flex-row space-x-30 p-10 justify-center">
      {/* <EthiopiaMap1 regionsData={regionsData} />
      <EthiopiaMap2 regionsData={regionsData} /> */}
      <EthiopiaMap3 regionsData={regionsData} />
    </div>
  );
}

export default App;
