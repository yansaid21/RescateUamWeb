import React from 'react'
import './TermsAndConditions.css';

export const TermsAndConditions = () => {
    return (
        <div className="terms-container">
            <h1>Términos y Condiciones</h1>
            <p className="intro">
                La aplicación <strong>Rescate UAM</strong> está diseñada para optimizar la gestión del riesgo en instituciones y empresas, proporcionando herramientas clave para la coordinación en situaciones de emergencia. Este sistema, intuitivo y eficiente, tiene como objetivo principal salvaguardar la seguridad de los usuarios ante eventos como sismos, incendios o cualquier otro riesgo establecido en los protocolos institucionales.
            </p>
            <h2>Objetivo del sistema</h2>
            <p>
                Rescate UAM permite a los usuarios reportar su estado de seguridad, ya sea indicando que están a salvo o notificando que se encuentran en peligro. Los brigadistas, por su parte, pueden coordinar las operaciones de rescate asignándose a puntos de encuentro específicos y enfocándose en la búsqueda de personas en riesgo. Los administradores tienen el control de supervisar estas actividades, gestionar roles y garantizar que los protocolos sean cumplidos eficientemente.
            </p>
            <h2>Estructura basada en roles</h2>
            <ul>
                <li>
                <strong>Administrador:</strong> Encargado de la gestión de usuarios, roles y configuración general de la aplicación.
                </li>
                <li>
                <strong>Brigadista:</strong> Responsable de coordinar y ejecutar acciones de rescate en los puntos de encuentro.
                </li>
                <li>
                <strong>Usuario:</strong> Participante que reporta su estado y sigue las indicaciones de los protocolos de emergencia.
                </li>
            </ul>
            <h2>Términos de uso</h2>
            <p>
                Al aceptar estos términos, autorizas a Rescate UAM a recopilar, almacenar y utilizar tus datos personales con el único propósito de garantizar tu seguridad y optimizar la gestión de riesgos en situaciones de emergencia. Los datos se tratarán con estricta confidencialidad y conforme a las normativas de protección de datos vigentes.
            </p>
        </div>
    )
}

