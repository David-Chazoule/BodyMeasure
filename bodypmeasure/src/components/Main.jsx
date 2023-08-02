import React from "react";
import CalculImc from "./CalculImc";
import CalCalorie from "./CalCalorie";

export default function Main() {
  return (
    <div className="main_container">
      <div className="imc-box">
        <h1>Calculer son indice de masse corporelle</h1>
        <CalculImc />
      </div>
      <div className="kal-box">
        <h1>Calculer votre besoin journalier en calories</h1>
        <CalCalorie />
      </div>
    </div>
  );
}