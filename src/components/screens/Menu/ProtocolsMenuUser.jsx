import { useEffect, useState } from "react";
import SectionMenu from "../../atoms/SectionMenu/SectionMenu";
import "./Menu.css";
import RiskSituationsController from "../../../api/risk_situations";
import ProtocolsController from "../../../api/protocols";
import { ENV } from "../../../utils/constants";
import { useParams } from "react-router-dom";

export const ProtocolsMenuUser = () => {
  const { id_risk_situation } = useParams();
  const [protocols, setProtocols] = useState([]);
  const [riskSituation, setRiskSituation] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProtocols = async () => {
      try {
        const response = await ProtocolsController.getProtocols(
          id_risk_situation
        );
        setProtocols(response.data);
        console.log("Protocols: ", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getRiskSituation = async () => {
      try {
        const response = await RiskSituationsController.getRisk(
          ENV.INSTITUTION_ID,
          id_risk_situation
        );
        setRiskSituation(response.data);
        console.log("Risk Situation: ", response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProtocols();
    getRiskSituation();
  }, [id_risk_situation]);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <div className="menu-container" style={{ justifyContent: "start" }}>
            <h1 className="menu-title">{riskSituation.name}</h1>
            <h2 className="menu-subtitle">Descripción</h2>
            <p className="menu-description">{riskSituation.description}</p>
            <div className="menu">
              {protocols.map((protocol) => (
                <SectionMenu
                  key={protocol.id}
                  color="#F4D73B"
                  text={protocol.name}
                  href={`/risk-sitiation/${id_risk_situation}/show-protocol/${protocol.id}`}
                  logo="warning-amber"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
