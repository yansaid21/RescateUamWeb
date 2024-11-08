import React from 'react';
import { Link } from 'react-router-dom';
import './SectionUsers.css';


export default function SectionUsers({ number, text, href, color }) {
  return (
    <div className="container">
      <a href={href}>
        <div className="buttonContainer">
          <div className="iconContainer">
            <span>{number}</span>
            <span className="buttonText">{text}</span>
            <div className="colorIndicator" style={{ backgroundColor: color }} />
          </div>
        </div>
      </a>
    </div>
  );
}
