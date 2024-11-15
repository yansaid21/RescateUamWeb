import React, { useState } from 'react';
import './TypeEmergencyButton.css'; // Asegúrate de crear un archivo CSS para los estilos

const TypeEmergencyButton = ({ text, onClick, disabled }) => {
    const [isYellow, setIsYellow] = useState(true);

    const handlePress = () => {
        if (!disabled) { // Solo ejecutar si no está deshabilitado
            setIsYellow(!isYellow); 
            onClick(text);
        }
    };

    return (
        <div 
            onClick={handlePress}
            className={`typeButtonContainer ${isYellow ? 'typeButton' : 'typeButtonPressed'} ${disabled ? 'typeButtonDisabled' : ''}`} // Agregar clase 'disabled'
        >
            <span className={`typeButtonText ${isYellow ? '' : 'typeButtonPressedText'}`}>
                {text}
            </span>
        </div>
    );
};

export default TypeEmergencyButton;