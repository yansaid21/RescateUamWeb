import { useEffect, useState } from "react";
import SectionMenu from "../../atoms/SectionMenu/SectionMenu";
import "./Menu.css";
import { useParams } from "react-router-dom";
import { CreateProtocol } from "../CreateProtocol/CreateProtocol";
import ProtocolsController from "../../../api/protocols";
import RiskSituationsController from "../../../api/risk_situations";
import { ENV } from "../../../utils/constants";
import { Popover, Button, notification } from "antd";

export const ProtocolsMenu = () => {
  const { id_risk_situation } = useParams();
  const [protocols, setProtocols] = useState([]);
  const [riskSituation, setRiskSituation] = useState({});
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();

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

  const [showCreateProtocol, setShowCreateProtocol] = useState(false);

  useEffect(() => {
    console.log("Estado showCreateProtocol: ", showCreateProtocol);
  }, [showCreateProtocol]);

  const handleCloseCreateProtocol = () => {
    setShowCreateProtocol(false);
  };

  const deleteProtocol = async (id_protocol) => {
    try {
      await ProtocolsController.deleteRiskSituation(
        id_risk_situation,
        id_protocol
      );
      const response = await ProtocolsController.getProtocols(
        id_risk_situation
      );
      setProtocols(response.data);
      api.success({
        message: "Protocolo eliminado",
        description: "El protocolo ha sido eliminado",
        style: {
          cursor: "pointer",
        },
        duration: 2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      {showCreateProtocol && (
        <CreateProtocol onClose={handleCloseCreateProtocol} />
      )}
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <div className="menu-container" style={{ justifyContent: "start" }}>
            <h1 className="menu-title">{riskSituation.name}</h1>
            <h2 className="menu-subtitle">Descripción</h2>
            <p className="menu-description">{riskSituation.description}</p>
            <SectionMenu
              color="#0090D0"
              text="Añadir Protocolo"
              href="create-protocol"
              logo="warning-amber"
              onClick={() => setShowCreateProtocol(true)}
            />
            <div className="menu">
              {protocols.map((protocol) => (
                <Popover
                  key={protocol.id}
                  title="Opciones"
                  trigger="click"
                  placement="right"
                  content={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        gap: "1rem",
                      }}
                    >
                      <Button
                        type="primary"
                        href={`/risk-sitiation/${id_risk_situation}/show-protocol/${protocol.id}`}
                      >
                        Ver Protocolo
                      </Button>
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#32CD32" }}
                        href={`/admin/protocols-menu/${id_risk_situation}/protocol/${protocol.id}/edit`}
                      >
                        Editar Protocolo
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => deleteProtocol(protocol.id)}
                      >
                        Eliminar Protocolo
                      </Button>
                    </div>
                  }
                >
                  <SectionMenu
                    color="#F4D73B"
                    text={protocol.name}
                    logo="warning-amber"
                  />
                </Popover>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
