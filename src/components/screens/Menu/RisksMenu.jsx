import React, { useState } from 'react';
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';
import { CreateRiskSituation } from '../CreateRiskSituation/CreateRiskSituation';

export const RisksMenu = () => {
  const [showCreateRisk, setShowCreateRisk] = useState(true);

  const handleClose = () => {
    setShowCreateRisk(false);
  };
  
  return (
    <>
      {showCreateRisk && <CreateRiskSituation onClose={handleClose} />}
      <div className="menu-container">
        <SectionMenu color="#F4D73B" text="Añadir Riesgo" href="/RisksMenu/createRiskSituation" logo="warning-amber" />
        <SectionMenu color="#0090D0" text="Sismo" href="/ProtocolsMenu" logo="warning-amber" />
        <SectionMenu color="#E36727" text="Incendio" href="/ProtocolsMenu" logo="warning-amber" />
        <SectionMenu color="#9CD04D" text="Evacuación" href="/ProtocolsMenu" logo="warning-amber" />
      </div>
    </>
  );
}

