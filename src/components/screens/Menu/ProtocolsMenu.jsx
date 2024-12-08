import React, { useEffect, useState } from 'react';
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';
import { CreateProtocol } from '../CreateProtocol/CreateProtocol';

export const ProtocolsMenu = () => {
  const [showCreateProtocol, setShowCreateProtocol] = useState(false);

  useEffect(() => {
    console.log('Estado showCreateProtocol: ', showCreateProtocol);
  }, [showCreateProtocol]);

  const handleCloseCreateProtocol = () => {
    setShowCreateProtocol(false);
  };

  return (
    <>
      {showCreateProtocol && (
        <CreateProtocol onClose={handleCloseCreateProtocol} />
      )}
      <div className="menu-container">
        <SectionMenu 
          color="#0090D0" 
          text="Añadir Protocolo" 
          href="admin/risks-menu/protocols-menu/create-protocol" 
          logo="warning-amber" 
          onClick={() => setShowCreateProtocol(true)}
        />
        <SectionMenu color="#0090D0" text="Modificar Indicaciones Antes" href="#" logo="warning-amber" />
        <SectionMenu color="#E36727" text="Modificar Indicaciones Durante" href="#" logo="warning-amber" />
        <SectionMenu color="#9CD04D" text="Modificar Indicaciones a Salvo" href="#" logo="warning-amber" />
        <SectionMenu color="#CE0071" text="Modificar Indicaciones en Peligro" href="#" logo="warning-amber" />
      
      </div>
    </>
  );
}

