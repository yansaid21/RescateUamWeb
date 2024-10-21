import React from 'react'
import Navbar from '../../molecules/Navbar'
import { BigEmergencyButton } from '../../atoms/BigEmergencyButton/BigEmergencyButton'
import "./Main.css"
import TypeEmergencyButton from '../../atoms/TypeEmergencyButton/TypeEmergencyButton'

export const Main = () => {
  return (
    <>
    <Navbar/>
    <div className='mainContainer'>
      <div className='BigButton'>
    <BigEmergencyButton/>
      </div>
      <div className='mainTypeEmergencyButton'>
      <TypeEmergencyButton text="Evacuación"/>
      </div>
      <div className='mainTypeEmergencyButton'>
      <TypeEmergencyButton text="Incendio"/>
      </div>
      <div className='mainTypeEmergencyButton'>
      <TypeEmergencyButton text="Sismo"/>
      </div>
    </div>
    </>
  )
}
