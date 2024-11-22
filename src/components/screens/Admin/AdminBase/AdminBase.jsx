import { useEffect, useState } from "react";
import { BigEmergencyButton } from "../../../atoms/BigEmergencyButton/BigEmergencyButton";
import "./AdminBase.css";
import TypeEmergencyButton from "../../../atoms/TypeEmergencyButton/TypeEmergencyButton";
import CompleteRegister from "../../../screens/completeRegister/CompleteRegister";
import { CreateReport } from "../../CreateReport/CreateReport";
import IncidentsController from "../../../../api/incidents";
import RiskSituationsController from "../../../../api/risk_situations";
import InstitutionsController from "../../../../api/institution";
import { Spinner } from "../../../atoms/Spinner/Spinner";
import { userStore } from "../../../../store/user";
import UserController from "../../../../api/user";
import { ENV } from "../../../../utils/constants";
import { institutionStore } from "../../../../store/institution";

export const AdminBase = () => {
  const { setIncident } = institutionStore();
  const { user } = userStore();
  const [userData, setUserData] = useState(null);
  const [showCompleteRegister, setShowCompleteRegister] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false); //estado de la alarma
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [incidentTypeId, setIncidentTypeId] = useState(null);
  const [riskSituations, setRiskSituations] = useState([]);
  const [theIncident, setTheIncident] = useState(null);
  const [isToggling, setIsToggling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserInfo = async () => {
    try {
      const id_user = user.id;
      if (id_user) {
        const user = await UserController.getUserInfo(Number(id_user));

        if (user && user.data) {
          setUserData(user);
          if (
            !user.data.rhgb ||
            !user.data.social_security ||
            !user.data.phone_number
          ) {
            setShowCompleteRegister(true);
          }
        }
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const checkInstitutionInfo = async () => {
    try {
      const institution = await InstitutionsController.getInstitution(
        ENV.INSTITUTION_ID
      );
      const institutionIncident = institution.data.active_incident;
      if (institutionIncident === null) {
        setTheIncident(null);
        setIncidentTypeId(null);
      } else {
        setIncidentTypeId(institutionIncident.risk_situation_id);
        console.log(
          "id del incidente activo: ",
          institutionIncident.risk_situation_id
        );
        localStorage.setItem("id_incident", institutionIncident.id);
        setIncident(institutionIncident);
        setTheIncident(institutionIncident);
      }
    } catch (error) {
      console.error("Error al obtener las situaciones de riesgo:", error);
    }
  };

  const fetchRiskSituations = async () => {
    try {
      const riskData = await RiskSituationsController.getRiskSituation(
        ENV.INSTITUTION_ID
      );
      console.log("riskData en main ", riskData.data);
      setRiskSituations(riskData.data);
    } catch (error) {
      console.error("Error al obtener las situaciones de riesgo:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkUserInfo();
    fetchRiskSituations();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    checkInstitutionInfo();
    setIsLoading(false);
  }, [isToggling]);

  const handleCompleteRegisterClose = () => {
    setShowCompleteRegister(false);
  };

  const toggleAlarm = () => {
    if (isToggling) {
      console.log("isToggling ", isToggling);

      return; // Prevenir ejecución si ya está en progreso
    }
    setIsToggling(true); // Marcar como en ejecución
    console.log("isToggling ", isToggling);
    setAlarmOn((prevAlarmOn) => {
      var newAlarmState = !prevAlarmOn;
      if (theIncident) {
        newAlarmState = false;
      }
      console.log("newAlarmState ", newAlarmState);

      if (!newAlarmState) {
        setShowCreateReport(true);
      } else {
        setShowCreateReport(false);
        (async () => {
          try {
            if (incidentTypeId) {
              // Verificamos que haya un tipo de incidente seleccionado
              if (!theIncident) {
                const incident = await IncidentsController.createIncident(
                  ENV.INSTITUTION_ID,
                  incidentTypeId
                );
                console.log(incident.data);
                checkInstitutionInfo();
                /* console.log('response create incidente', incident); */
              } else {
                console.log("ya hay un incidente activo");
              }
            } else {
              console.warn("No se ha seleccionado un tipo de incidente.");
            }
          } catch (error) {
            console.error("Error al crear el incidente:", error);
          }
        })();
      }
      setIsToggling(false); // Liberar bandera al finalizar

      return newAlarmState;
    });
  };

  const handleReportSubmit = () => {
    setShowCreateReport(false);
    checkInstitutionInfo();
  };

  //seleccionar tipo de incidente
  const handleTypeButtonClick = (id) => {
    if (!incidentTypeId) {
      // Solo permitir selección si no hay un tipo de incidente
      setIncidentTypeId(id);
    } else {
      setIncidentTypeId(null);
    }
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <>
        {showCompleteRegister && (
          <CompleteRegister onClose={handleCompleteRegisterClose} />
        )}
        {showCreateReport && (
          <CreateReport onClose={handleReportSubmit} risk={incidentTypeId} />
        )}
        <div className="mainContainer">
          <div className="BigButton">
            <BigEmergencyButton
              onClick={toggleAlarm}
              disabled={incidentTypeId === null ? true : false}
              running={theIncident ? true : false}
            />
          </div>
          <div className="mainTypeEmergencyButton">
            {riskSituations.map((situation) => (
              <TypeEmergencyButton
                key={situation.id}
                text={situation.name}
                disabled={
                  incidentTypeId === null
                    ? false
                    : situation.id === incidentTypeId
                    ? false
                    : true
                }
                running={theIncident ? true : false}
                onClick={() => handleTypeButtonClick(situation.id)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
};
