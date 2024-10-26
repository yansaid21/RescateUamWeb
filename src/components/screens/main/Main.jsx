import React, { useEffect, useState } from 'react'
import Navbar from '../../molecules/Navbar'
import { BigEmergencyButton } from '../../atoms/BigEmergencyButton/BigEmergencyButton'
import "./Main.css"
import TypeEmergencyButton from '../../atoms/TypeEmergencyButton/TypeEmergencyButton'
import { User } from '../../../api/user';
import CompleteRegister from '../../screens/completeRegister/CompleteRegister'

const userController = new User();

export const Main = () => {
  const [userData, setUserData] = useState(null);
  const [showCompleteRegister, setShowCompleteRegister] = useState(false);
  const checkUserInfo = async () => {
    try {
      const token = await localStorage.getItem('token'); 
      const id_user = await localStorage.getItem('id'); 

      console.log('id en main ', id_user);
      console.log('token en main ', token);
      
      if (token && id_user) {
        const user = await userController.getUserInfo(token, Number(id_user)); 
        console.log('user en main ', user);
        
        if (user && user.data) {
          console.log('user data en main ', user.data);
          setUserData(user);
          if (!user.data.rhgb || !user.data.social_security || !user.data.phone_number) {
            setShowCompleteRegister(true);
            console.log('show complete register ', showCompleteRegister);
            
          }
        }
      }

    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

   // Función para cerrar el formulario de registro completo
  const handleCompleteRegisterClose = () => {
    setShowCompleteRegister(false); // Cambia el estado a falso para ocultar el formulario
  };

  return (
    <>
    {showCompleteRegister && (
        <CompleteRegister onClose={handleCompleteRegisterClose} />
    )}
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
