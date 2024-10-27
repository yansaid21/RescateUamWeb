import React from 'react';
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';

export const ProtocolsMenu = () => {
  return (
    <div className="menu-container">
      <SectionMenu color="#0090D0" text="Añadir Protocolo" href="#" logo="warning-amber" />
      <SectionMenu color="#0090D0" text="Modificar Indicaciones Antes" href="#" logo="warning-amber" />
      <SectionMenu color="#E36727" text="Modificar Indicaciones Durante" href="#" logo="warning-amber" />
      <SectionMenu color="#9CD04D" text="Modificar Indicaciones a Salvo" href="#" logo="warning-amber" />
      <SectionMenu color="#CE0071" text="Modificar Indicaciones en Peligro" href="#" logo="warning-amber" />
    
    </div>
  );
}

