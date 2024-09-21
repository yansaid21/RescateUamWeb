import React from 'react';
import Google from '../../../assets/google.png';
import './GoogleButton.css';

export const GoogleButton = () => {
    return (
        <div className='box'>
            <img src={Google} className='box__img'/>
            <p className='box__text'>Google</p>
        </div>
    )
}
