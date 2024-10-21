import React, { useState } from 'react';
import './TypeEmergencyButton.css'; // Asegúrate de crear un archivo CSS para los estilos


const TypeEmergencyButton = ({ text }) => {
    const [isYellow, setIsYellow] = useState(true);

    const handlePress = () => {
        setIsYellow(!isYellow); 
    };

    return (
        <div 
            onClick={handlePress}
            className={`typeButtonContainer ${isYellow ? 'typeButton' : 'typeButtonPressed'}`}
        >
            <span className={`typeButtonText ${isYellow ? '' : 'typeButtonPressedText'}`}>
                {text}
            </span>
        </div>
    );
};

export default TypeEmergencyButton;
