import RoundedButton from "../../../atoms/RoundedButton/RoundedButton";
import "./BrigadierIncident.css";
import logo1 from "../../../../assets/UAM/Logos_UAM-06.png"; // Ajusta la ruta según tu estructura
import logo2 from "../../../../assets/UAM/Logos_UAM-10.png";
import StatisticsReportWithSocket from "../../../molecules/StatisticsReportWithSocket/StatisticsReportWithSocket";
import UserReportsTable from "../../../tables/UserReportsTable/UserReportsTable";
import { notification } from "antd";
import { institutionStore } from "../../../../store/institution";
import { userStore } from "../../../../store/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENV } from "../../../../utils/constants";
import { Select, Modal, Button } from "antd";
import MeetPointsController from "../../../../api/meet_points";

export const BrigadierIncident = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { incident } = institutionStore();
  const { user } = userStore();
  const [showModal, setShowModal] = useState(false);
  const [meetpoint, setMeetpoint] = useState(null);
  const [meetpoints, setMeetpoints] = useState([]);
  const [loadingMeetpoints, setLoadingMeetpoints] = useState(false);

  const handleAssignMeetPoint = async () => {
    try {
      await MeetPointsController.assignMeetPoint(ENV.INSTITUTION_ID, meetpoint);
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  const syncMeetpoints = async () => {
    try {
      setLoadingMeetpoints(true);
      const meetpoints = await MeetPointsController.getMeetPoints(
        ENV.INSTITUTION_ID,
      );
      const newMeetPoints = meetpoints.data.map((meetpoint) => {
        return { value: meetpoint.id, label: meetpoint.name };
      });
      setMeetpoints(newMeetPoints);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMeetpoints(false);
    }
  };

  useEffect(() => {
    syncMeetpoints();
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
      <section className="brigadier-incident">
        <RoundedButton
          className="assign"
          onClick={() => setShowModal(true)}
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
        <Modal
          onCancel={() => {
            setShowModal(false);
          }}
          title="Asignarse a un punto de encuentro"
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
            body: {
              display: "flex",
              padding: "1rem",
              justifyContent: "center",
            },
            footer: {
              display: "flex",
              justifyContent: "center",
            },
          }}
          footer={[
            <Button key="submit" type="primary" onClick={handleAssignMeetPoint}>
              Asignarse
            </Button>,
          ]}
        >
          <Select
            style={{ width: "300px" }}
            size="large"
            onChange={(value) => setMeetpoint(value)}
            options={meetpoints}
            loading={loadingMeetpoints}
          />
        </Modal>
      </section>
    </>
  );
};
