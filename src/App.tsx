import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbard from "./components/parts/Navbard";
import VoyantsTable from "./components/Administrateur/Voyant/VoyantTable";
import { Route, Routes } from "react-router-dom";
import Depart from "./components/pages/Depart";
import Ramassage from "./components/pages/Ramassage";
import Recap from "./components/pages/Recap";

function App() {
  return (
    <div>
      <Navbard />
      <Routes>
        <Route path="/ajouters" element={<VoyantsTable />} />
        <Route path="/depart" element={<Depart />} />
        <Route path="/ramassage" element={<Ramassage />} />
        <Route path="/recap" element={<Recap />} />
      </Routes>
    </div>
  );
}

export default App;
