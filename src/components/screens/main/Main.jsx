import React, { useEffect, useState } from 'react'
import Navbar from '../../molecules/Navbar/AdminNavbar'
import { BigEmergencyButton } from '../../atoms/BigEmergencyButton/BigEmergencyButton'
import "./Main.css"
import TypeEmergencyButton from '../../atoms/TypeEmergencyButton/TypeEmergencyButton'
import { User } from '../../../api/user';
import CompleteRegister from '../../screens/completeRegister/CompleteRegister'
import { CreateReport } from '../CreateReport/CreateReport'
import { Incidents } from '../../../api/incidents'
import { Risk_situation } from '../../../api/risk_situations'
import { Institution } from '../../../api/institution'

const userController = new User();
const incidentController = new Incidents();
const riskSituationController = new Risk_situation();
const institutionController = new Institution(); 

export const Main = () => {
  const [userData, setUserData] = useState(null);
  const [showCompleteRegister, setShowCompleteRegister] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false); //estado de la alarma
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [incidentTypeId, setIncidentTypeId] = useState(null);
  const [riskSituations, setRiskSituations] = useState([]);
  const [isToggling, setIsToggling] = useState(false);
  const [newAlarmState, setNewAlarmState] = useState(null);

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

  const checkInstitutionInfo= async () => {
    try {
      const token = await localStorage.getItem('token');
      const id_institution = 1; 
      if (token && id_institution) {
        const institution = await institutionController.getInstitution(token, id_institution);
        console.log("institution ", institution.data);
       const institutionIncidentId= institution.data.active_incident
        console.log("id de el incidente activo: ",institutionIncidentId);
  /*       if(institutionIncidentId === null){
          setIsToggling(false);
        }else{
          setIsToggling(true);
        } */
        
      }
    } catch (error) {
      console.error("Error al obtener las situaciones de riesgo:", error);
    }
  }
  const fetchRiskSituations = async () => {
    try {
      const token = await localStorage.getItem('token');
      const id_institution = 1; 
      if (token && id_institution) {
        const riskData = await riskSituationController.getRiskSituation(token, id_institution);
        console.log("riskData en main ", riskData.data);
        setRiskSituations(riskData.data);
      }
    } catch (error) {
      console.error("Error al obtener las situaciones de riesgo:", error);
    }
  };

  useEffect(() => {
    checkUserInfo();
    fetchRiskSituations();
  }, []);

  useEffect(() => {
    checkInstitutionInfo();
  }, [isToggling]);



  const handleCompleteRegisterClose = () => {
    setShowCompleteRegister(false); 
  };

  const toggleAlarm = () => {
    if (isToggling){
console.log('isToggling ', isToggling);

      return; // Prevenir ejecución si ya está en progreso
    } 
    setIsToggling(true); // Marcar como en ejecución
    console.log('isToggling ', isToggling);
    setAlarmOn(prevAlarmOn => {
      setNewAlarmState(!prevAlarmOn);
      console.log('newAlarmState ', newAlarmState);
      
      if (!newAlarmState) {
        setShowCreateReport(true);
      } else {
        setShowCreateReport(false);
        (async () => {
          try {
            const token = localStorage.getItem('token');
            console.log('token en create incident ', token);
            if (incidentTypeId) { // Verificamos que haya un tipo de incidente seleccionado
              const incident = await incidentController.createIncident(token, 1, incidentTypeId );
              console.log(incident.data);
              
              localStorage.setItem('id_incident', incident.data.id);
              console.log('response create incidente', incident);
            } else {
              console.warn("No se ha seleccionado un tipo de incidente.");
            }
          } catch (error) {
            console.error('Error al crear el incidente:', error);
          } finally {
            
            console.log('isToggling  en funa¿¿¿¿asdufjsdfj', isToggling);
            
          }
        }
        
      )();
    }
    setIsToggling(false); // Liberar bandera al finalizar
  
      return newAlarmState;
    });
  };

  const handleReportSubmit = () => {
    setShowCreateReport(false); 
  };

  //seleccionar tipo de incidente
  const handleTypeButtonClick = (id) => {
    if (!incidentTypeId) { // Solo permitir selección si no hay un tipo de incidente
      setIncidentTypeId(id);
    }else{
      setIncidentTypeId(null);
    }
  };
  
  return (
    <>
    {showCompleteRegister && (
        <CompleteRegister onClose={handleCompleteRegisterClose} />
    )}
    {showCreateReport && <CreateReport onClose={handleReportSubmit} risk={incidentTypeId}/>}
    {/* <Navbar/> */}
    <div className='mainContainer'>
      <div className='BigButton'>
    <BigEmergencyButton 
    onClick={toggleAlarm}
    disabled={incidentTypeId === null? true: false}
    />
      </div>
      <div className='mainTypeEmergencyButton'>
        {riskSituations.map((situation) => (
          <TypeEmergencyButton 
            key={situation.id} 
            text={situation.name} 
            disabled={incidentTypeId === null? false: situation.id ===incidentTypeId ? false : true}
            onClick={() => handleTypeButtonClick(situation.id)
            }
          />
        ))}
      </div>
    </div>
    </>
  )
}
