import React from 'react';
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';

export const RisksMenu = () => {
  return (
    <div className="menu-container">
      <SectionMenu color="#F4D73B" text="Añadir Riesgo" href="/loggedIn/main" logo="warning-amber" />
      <SectionMenu color="#0090D0" text="Sismo" href="/loggedIn/main" logo="warning-amber" />
      <SectionMenu color="#E36727" text="Incendio" href="/loggedIn/main" logo="warning-amber" />
      <SectionMenu color="#9CD04D" text="Evacuación" href="/loggedIn/main" logo="warning-amber" />
    </div>
  );
}

