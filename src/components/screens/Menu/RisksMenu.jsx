import React, { useEffect, useState } from 'react';
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';
import { CreateRiskSituation } from '../CreateRiskSituation/CreateRiskSituation';
import RiskSituationsController from '../../../api/risk_situations';

export const RisksMenu = () => {
  const [showCreateRisk, setShowCreateRisk] = useState(false);
  const [risks, setRisks] = useState([]);

  //llamar a los riesgos existentes
  const getRisks = async () => {
    try {
      const response = await RiskSituationsController.getRiskSituation(1);
      setRisks(response.data);
    } catch (error){
      console.error(error);
    }
  }

  useEffect(() => {
    console.log('Estado showCreateRisk: ', showCreateRisk);
    getRisks();
  }, [showCreateRisk]);

  //cerrar la ventana de la creación del riesgo
  const handleCloseCreateRisk = () => {
    setShowCreateRisk(false);
  };

  //obtener id del riesgo seleccionado
  const handleClickRisk = (id_risk) => {
    localStorage.setItem('id_risk', id_risk);
  }
  
  return (
    <>
    {showCreateRisk && (
      <CreateRiskSituation onClose={handleCloseCreateRisk} />
    )}
      <div className="menu-container">
        <SectionMenu 
          color="#F4D73B" 
          text="Añadir Riesgo"  
          logo="warning-amber" 
          onClick={() => setShowCreateRisk(true)}/>
        {risks.map((risk) => (
          <SectionMenu
            key={risk.id}
            text={risk.name}
            color="#0090D0"
            href="/admin/protocols-menu"
            logo="warning-amber"
            onClick={handleClickRisk(risk.id)}
          />
        ))}
      </div>
    </>
  );
}

