import React, { useEffect, useState } from 'react'
import SectionMenu from '../../atoms/SectionMenu/SectionMenu';
import './Menu.css';
import RiskSituationsController from '../../../api/risk_situations';

export const ProtocolsMenuUser = () => {
    const riskId = localStorage.getItem('id_risk');
    const [riskName, setRiskName] = useState('');

    const getRisk = async () => {
        try {
            const response = await RiskSituationsController.getRisk(1, riskId);
            setRiskName(response.data.name);
        } catch (error){
            console.log('Error getRisk in ProtocolsMenuUser', error);
        }
    }

    useEffect(() => {
        getRisk();
    },)

    return (
        <>
            <div className="menu-container">
            <h2>{riskName}</h2>
                <SectionMenu color="#0090D0" text="Modificar Indicaciones Antes" href="#" logo="warning-amber" />
                <SectionMenu color="#E36727" text="Modificar Indicaciones Durante" href="#" logo="warning-amber" />
                <SectionMenu color="#9CD04D" text="Modificar Indicaciones a Salvo" href="#" logo="warning-amber" />
                <SectionMenu color="#CE0071" text="Modificar Indicaciones en Peligro" href="#" logo="warning-amber" />
            </div>
        </>
    )
}

