import { useEffect, useState } from "react";
import RiskSituationsController from "../../../../api/risk_situations";
import SectionMenu from "../../../atoms/SectionMenu/SectionMenu";
import "./UserBase.css";

export const UserBase = () => {
  const [risks, setRisks] = useState([]);

  const getRisks = async () => {
    try {
      const response = await RiskSituationsController.getRiskSituation(1);
      setRisks(response.data);
    } catch (error){
      console.error(error);
    }
  }

  useEffect(() => {
    getRisks();
  }, [])

  //obtener id del riesgo
  const handleClickRisk = (id_risk) => {
    localStorage.setItem('id_risk', id_risk);
  }


  return (
    <div className="menu-container">
      <SectionMenu color="#000000" text="Brigadistas" href="/user/brigadiers" logo="person" />
      {risks.map((risk) => (
          <SectionMenu
            key={risk.id}
            text={`Protocolos de ${risk.name}`}
            color="#0090D0"
            href="/user/risk/protocols-menu"
            logo="warning-amber"
            onClick={() => handleClickRisk(risk.id)}
          />
        ))}
    </div>
  )
};
