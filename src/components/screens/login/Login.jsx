import React from 'react';
import './Login.css';
import { Logo } from '../../../assets/react.svg'
import { Input } from '../../atoms/input/Input';

export const Login = () => {
    return (
        <div className='content'>
            <img src={Logo} />
            <h2>Bienvenido a Rescate UAM</h2>
            <Input />
        </div>
    )
}


