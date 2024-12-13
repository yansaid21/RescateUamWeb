import React, { useState, useEffect } from "react";
import "./BigEmergencyButton.css"; // Asegúrate de crear un archivo CSS para los estilos
import logo1 from "../../../assets/UAM/Logos_UAM-06.png"; // Ajusta la ruta según tu estructura
import logo2 from "../../../assets/UAM/Logos_UAM-10.png";

export const BigEmergencyButton = ({ onClick, disabled, running }) => {
  const [isYellow, setIsYellow] = useState(true);

  // Actualiza isYellow solo cuando `running` cambie
  useEffect(() => {
    setIsYellow(!running);
  }, [running]);
  const handlePress = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      onClick={handlePress}
      className={`emergencyButtonContainer ${
        isYellow ? "emergencyButton" : "emergencyButtonPressed"
      }${disabled ? " emergencyButtonDisabled" : ""}`}
    >
      <img
        src={isYellow ? logo1 : logo2}
        alt="Logo"
        className="emergencyLogo"
      />
    </div>
  );
};
