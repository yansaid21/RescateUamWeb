import RoundedButton from "../../../atoms/RoundedButton/RoundedButton";
import "./AdminIncident.css";
import logo1 from "../../../../assets/UAM/Logos_UAM-06.png"; // Ajusta la ruta según tu estructura
import logo2 from "../../../../assets/UAM/Logos_UAM-10.png";
import StatisticsReportWithSocket from "../../../molecules/StatisticsReportWithSocket/StatisticsReportWithSocket";
import UserReportsTable from "../../../tables/UserReportsTable/UserReportsTable";
import BrigadistsTable from "../../../tables/BrigadistTable/BrigadistTable";
import { institutionStore } from "../../../../store/institution";
import { userStore } from "../../../../store/user";
import { ENV } from "../../../../utils/constants";
import IncidentsController from "../../../../api/incidents";
import { Modal, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

export const AdminIncident = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { incident } = institutionStore();
  const { user } = userStore();
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(null);

  const handleCloseIncident = async () => {
    try {
      const update_incident = await IncidentsController.updateIncident(
        ENV.INSTITUTION_ID,
        incident.risk_situation.id,
        description,
        incident.id,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (incident && user.incident_reported === null) {
      api.warning({
        message: "Incidente",
        description: `Por favor reportate en el incidente dando click aquí`,
        closable: false,
        style: {
          cursor: "pointer",
        },
        onClick: () => {
          navigate("/user");
        },
      });
    }
  }, []);

  return (
    <>
      {contextHolder}
      <section className="admin-incident">
        <RoundedButton
          className="alarm"
          onClick={() => setShowModal(true)}
          disabled={incident === null}
          buttonClass={{
            width: "300px",
            height: "300px",
            backgroundColor: "#F4D73B",
          }}
          disabledClass={{ backgroundColor: "#0090D0" }}
          imageSrc={logo1}
          disabledImageSrc={logo2}
        />
        <StatisticsReportWithSocket
          channel={`privileged-channel.${ENV.INSTITUTION_ID}`}
          event={`.userReportChange`}
        />
        <UserReportsTable className="user-reports wide-table" size="large" />
        <BrigadistsTable className="brigadiers wide-table" size="large" />
        <Modal
          onCancel={() => {
            setShowModal(false);
          }}
          title="Cierre de incidente"
          open={showModal}
          centered
          styles={{
            header: {
              textAlign: "center",
              fontSize: "2rem",
            },
            mask: {
              backdropFilter: "blur(10px)",
            },
          }}
          footer={[
            <Button key="submit" type="primary" onClick={handleCloseIncident}>
              Cerrar incidente
            </Button>,
          ]}
        >
          <TextArea
            placeholder="Desribe lo que ha ocurrido durante el incidente"
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: 120 }}
          />
        </Modal>
      </section>
    </>
  );
};
