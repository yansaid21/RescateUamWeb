import React, { useEffect, useState } from 'react';
import './TypeEmergencyButton.css';

const TypeEmergencyButton = ({ text, onClick, disabled, running }) => {
    const [isYellow, setIsYellow] = useState(true);

    useEffect(() => {
        if (running) {
            // Cuando `running` está activo, reiniciamos el estado inicial
            setIsYellow(true);
        }
    }, [running]);

    const handlePress = () => {
        if (!disabled && !running) { // Solo permitir interacción si no está deshabilitado y `running` es falso
            setIsYellow(!isYellow); 
            onClick(text);
        }
    };

    // Si `running` está activo, no renderizar interacción
    if (running) {
        return null; // Devuelve un componente vacío mientras `running` está activo
    }

    return (
        <div
            onClick={handlePress}
            className={`typeButtonContainer ${isYellow ? 'typeButton' : 'typeButtonPressed'} ${disabled ? 'typeButtonDisabled' : ''}`}
        >
            <span className={`typeButtonText ${isYellow ? '' : 'typeButtonPressedText'}`}>
                {text}
            </span>
        </div>
    );
};

export default TypeEmergencyButton;
