import React from 'react';
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';

export const Menu = () => {
  return (
    <div className="menu-container">
      <SectionMenu color="#000000" text="Administradores/Brigadistas" href="/loggedIn/main" logo="person" />
      <SectionMenu color="#F4D73B" text="Incidentes" href="/loggedIn/main" logo="warning-amber" />
      <SectionMenu color="#C20590" text="Protocolos" href="/loggedIn/main" logo="warning" />
      <SectionMenu color="#9CD04D" text="Puntos de encuentro" href="/loggedIn/main" logo="place" />
      <SectionMenu color="#E36727" text="Estructura" href="/loggedIn/main" logo="location-city" />
    </div>
  );
}

