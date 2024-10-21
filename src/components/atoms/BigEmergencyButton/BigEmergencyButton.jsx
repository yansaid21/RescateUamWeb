import React, { useState } from 'react';
import './BigEmergencyButton.css'; // Asegúrate de crear un archivo CSS para los estilos
import logo1 from '../../../assets/UAM/Logos_UAM-08.png'; // Ajusta la ruta según tu estructura
import logo2 from '../../../assets/UAM/Logos_UAM-10.png'

export const BigEmergencyButton = () => {
    const [isYellow, setIsYellow] = useState(true);

    const handlePress = () => {
        setIsYellow(!isYellow); 
    };

    return (
        <div 
            onClick={handlePress}
            className={`emergencyButtonContainer ${isYellow ? 'emergencyButton' : 'emergencyButtonPressed'}`}
        >
            <img 
                src={isYellow ? logo1 : logo2} 
                alt="Logo" 
                className="emergencyLogo" 
            />
        </div>
    );
}
