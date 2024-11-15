import React, { useEffect, useState } from 'react';
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';
import { CreateRiskSituation } from '../CreateRiskSituation/CreateRiskSituation';

export const RisksMenu = () => {
  const [showCreateRisk, setShowCreateRisk] = useState(false);

  useEffect(() => {
    console.log('Estado showCreateRisk: ', showCreateRisk);
  }, [showCreateRisk]);

  const handleCloseCreateRisk = () => {
    setShowCreateRisk(false);
  };
  
  return (
    <>
    {showCreateRisk && (
      <CreateRiskSituation onClose={handleCloseCreateRisk} />
    )}
      <div className="menu-container">
        <SectionMenu 
          color="#F4D73B" 
          text="Añadir Riesgo" 
          href="/RisksMenu/createRiskSituation" 
          logo="warning-amber" 
          onClick={() => setShowCreateRisk(true)}/>
        <SectionMenu color="#0090D0" text="Sismo" href="/ProtocolsMenu" logo="warning-amber" />
        <SectionMenu color="#E36727" text="Incendio" href="/ProtocolsMenu" logo="warning-amber" />
        <SectionMenu color="#9CD04D" text="Evacuación" href="/ProtocolsMenu" logo="warning-amber" />
      </div>
    </>
  );
}

