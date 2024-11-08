import React from 'react';
import SectionUsers from '../../atoms/SectionUsers/SectionUsers';



export default function UsersStadistics({ titleText }) {
    return (
        <div className="users-stadistics-container">
            <h1 className="title">{titleText}</h1>
            <SectionUsers number="500" text="sin reporte" href="/loggedIn/crudBrigadist" color="#575757" />
            <SectionUsers number="70" text="a salvo" href="/loggedIn/crudBrigadist" color="#9CD04D" />
            <SectionUsers number="10" text="en peligro" href="/loggedIn/crudBrigadist" color="#CE0071" />
        </div>
    );
}
