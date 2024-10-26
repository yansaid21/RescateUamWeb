import React, { useEffect, useState } from 'react'
import Navbar from '../../molecules/Navbar'
import { BigEmergencyButton } from '../../atoms/BigEmergencyButton/BigEmergencyButton'
import "./Main.css"
import TypeEmergencyButton from '../../atoms/TypeEmergencyButton/TypeEmergencyButton'
import { User } from '../../../api/user';
import CompleteRegister from '../../screens/completeRegister/CompleteRegister'
import { CreateReport } from '../CreateReport/CreateReport'

const userController = new User();

export const Main = () => {
  const [userData, setUserData] = useState(null);
  const [showCompleteRegister, setShowCompleteRegister] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false); //estado de la alarma
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [incidentType, setIncidentType] = useState(''); //nombre del incidente

  const checkUserInfo = async () => {
    try {
      const token = await localStorage.getItem('token'); 
      const id_user = await localStorage.getItem('id'); 

      //console.log('id en main ', id_user);
      //console.log('token en main ', token);
      
      if (token && id_user) {
        const user = await userController.getUserInfo(token, Number(id_user)); 
        //console.log('user en main ', user);
        
        if (user && user.data) {
          //console.log('user data en main ', user.data);
          setUserData(user);
          if (!user.data.rhgb || !user.data.social_security || !user.data.phone_number) {
            setShowCompleteRegister(true);
            //console.log('show complete register ', showCompleteRegister);
            
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

  const handleCompleteRegisterClose = () => {
    setShowCompleteRegister(false); 
  };

  const toggleAlarm = () => {
    
    setAlarmOn(prevAlarmOn => {
      const newAlarmState = !prevAlarmOn;

      if (!newAlarmState) { // Cuando la alarma se desactiva (de true a false)
          setShowCreateReport(true);
      } else { // Cuando la alarma se activa
          setShowCreateReport(false);
      }

      return newAlarmState;
  });
};

  const handleReportSubmit = () => {
    setShowCreateReport(false); 
  };

  //seleccionar tipo de incidente
  const handleTypeButtonClick = (type) => {
    setIncidentType(type); 
    //console.log("Tipo de incidente seleccionado:", type);
  };
  
  return (
    <>
    {showCompleteRegister && (
        <CompleteRegister onClose={handleCompleteRegisterClose} />
    )}
    {showCreateReport && <CreateReport onClose={handleReportSubmit} incidentType={incidentType}/>}
    <Navbar/>
    <div className='mainContainer'>
      <div className='BigButton'>
    <BigEmergencyButton onClick={toggleAlarm}/>
      </div>
      <div className='mainTypeEmergencyButton'>
      <TypeEmergencyButton text="Evacuación" onClick={handleTypeButtonClick}/>
      </div>
      <div className='mainTypeEmergencyButton'>
      <TypeEmergencyButton text="Incendio" onClick={handleTypeButtonClick}/>
      </div>
      <div className='mainTypeEmergencyButton'>
      <TypeEmergencyButton text="Sismo" onClick={handleTypeButtonClick}/>
      </div>
    </div>
    </>
  )
}
