import React from 'react';
import { Link } from 'react-router-dom';
import { MdPerson, MdWarningAmber, MdWarning, MdPlace, MdLocationCity, MdArrowForwardIos } from 'react-icons/md';
import './SectionMenu.css';

const iconMap = {
  person: MdPerson,
  "warning-amber": MdWarningAmber,
  warning: MdWarning,
  place: MdPlace,
  "location-city": MdLocationCity,
};



export default function SectionMenu({ text, href, logo, color, onClick }) {
  const IconComponent = iconMap[logo];

  return (
    <div 
      className="section-menu-container" 
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      <Link to={href} className="section-menu-link">
        <div className="section-menu-content">
          <div className="section-menu-icon" style={{ color }}>
            <IconComponent size={18} />
          </div>
          <span className="section-menu-text">{text}</span>
          <MdArrowForwardIos size={20} color="#363853" />
        </div>
      </Link>
    </div>
  );
}
