import RoundedButton from "../../../atoms/RoundedButton/RoundedButton";
import "./BrigadierIncident.css";
import logo1 from "../../../../assets/UAM/Logos_UAM-06.png";
import logo2 from "../../../../assets/UAM/Logos_UAM-10.png";
import StatisticsReportWithSocket from "../../../molecules/StatisticsReportWithSocket/StatisticsReportWithSocket";
import UserReportsTable from "../../../tables/UserReportsTable/UserReportsTable";
import SelectMeetPointModal from "../../../molecules/SelectMeetPointModal/SelectMeetPointModal.jsx";
import { notification, Tag, Tooltip } from "antd";
import { institutionStore } from "../../../../store/institution";
import { userStore } from "../../../../store/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENV } from "../../../../utils/constants";
import { Spinner } from "../../../atoms/Spinner/Spinner.jsx";

export const BrigadierIncident = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { incident } = institutionStore();
  const { user } = userStore();
  const [showModal, setShowModal] = useState(false);
  const [loadingMeetPoint, setLoadingMeetPoint] = useState(false);

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
      <section className="brigadier-incident">
        <section
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {loadingMeetPoint ? (
            <Spinner />
          ) : (
            <>
              <RoundedButton
                disabled={!!user.brigadier_meet_point}
                disabledText="Ya estas asignado a un punto de encuentro"
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
              <div>
                <strong>Punto de encuentro: </strong>
                <Tag color={user.brigadier_meet_point ? "blue" : "default"}>
                  {user.brigadier_meet_point
                    ? user.brigadier_meet_point.meet_point.name
                    : "No asignado"}
                </Tag>
              </div>
            </>
          )}
        </section>
        <StatisticsReportWithSocket
          channel={`privileged-channel.${ENV.INSTITUTION_ID}`}
          event={`.userReportChange`}
        />
        <UserReportsTable className="user-reports wide-table" size="large" />
        <SelectMeetPointModal
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            setLoadingMeetPoint(false);
          }}
          onLoading={() => setLoadingMeetPoint(true)}
        />
      </section>
    </>
  );
};
