import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbard from "./components/parts/Navbard";
import VoyantsTable from "./components/Administrateur/Voyant/VoyantTable";

function App() {
  return (
    <div>
      <Navbard />
      <VoyantsTable />
    </div>
  );
}

export default App;
