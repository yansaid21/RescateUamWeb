import "./UserIncident.css";
import UserReportsController from "../../../../api/userReports";
import { institutionStore } from "../../../../store/institution";
import ZonesController from "../../../../api/zones";
import { useEffect, useState } from "react";
import { Button, Modal, Select, Input, Tooltip } from "antd";
import RoundedButton from "../../../atoms/RoundedButton/RoundedButton";
import { Spinner } from "../../../atoms/Spinner/Spinner";
import BrigadistTable from "../../../tables/BrigadistTable/BrigadistTable";

const { TextArea } = Input;

export const UserIncident = () => {
  const { institution, incident } = institutionStore();
  const [userReport, setUserReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [state, setState] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [declareSafe, setDeclareSafe] = useState(false);
  const [meetPoints, setMeetPoints] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleModal = () => {
    if (userReport && (userReport.state === "outside" || userReport.resolution))
      return;
    if (userReport) {
      if (
        userReport.state === "safe" ||
        (userReport.state === "at_risk" && (!state || state === "at_risk"))
      ) {
        const updatedFields = {};
        if (state && state !== userReport.state) updatedFields.state = state;
        if (location && location !== userReport.zone_id)
          updatedFields.zone_id = location;
        if (description && description !== userReport.description)
          updatedFields.description = description;

        if (Object.keys(updatedFields).length > 0) {
          UserReportsController.updateUserReport(
            institution.id,
            incident.risk_situation_id,
            incident.id,
            userReport.id,
            updatedFields,
          ).then((data) => {
            setMeetPoints(data.data.zone?.meet_points);
            setUserReport(data.data);
            setShowModal(false);
          });
        } else {
          setShowModal(false);
        }
      }
    } else {
      UserReportsController.createUserReport(
        institution.id,
        incident.risk_situation_id,
        incident.id,
        {
          state,
          zone_id: location,
          description,
        },
      ).then((data) => {
        setUserReport(data.data);
        setMeetPoints(data.data.zone?.meet_points);
        setShowModal(false);
      });
    }
  };

  const handleDeclareSafe = () => {
    if (
      userReport &&
      userReport.state === "at_risk" &&
      !userReport.resolution
    ) {
      UserReportsController.userReportResolution(
        institution.id,
        incident.risk_situation_id,
        incident.id,
        userReport.id,
        {
          state: "safe",
          description: description,
        },
      ).then((data) => {
        setUserReport(data.data);
        setShowModal(false);
      });
    }
  };

  useEffect(() => {
    async function fetchZones() {
      try {
        const zones = await ZonesController.getZones(institution.id);
        setZoneOptions(
          zones.data.map((zone) => {
            return {
              value: zone.id,
              label: zone.name,
            };
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchUserReport() {
      try {
        const userReport =
          await UserReportsController.getUserReportInActiveIncident(
            institution.id,
          );
        setUserReport(userReport.data);
        console.log(userReport.data);
        if (!userReport.data) {
          setShowModal(true);
          setStateOptions([
            {
              value: "safe",
              label: "A salvo",
            },
            {
              value: "at_risk",
              label: "En riesgo",
            },
            {
              value: "outside",
              label: "Fuera de la institución",
            },
          ]);
        } else {
          setMeetPoints(userReport.data.zone?.meet_points);
          if (userReport.data.state === "outside") {
            setStateOptions([
              {
                value: "outside",
                label: "Fuera de la institución",
              },
            ]);
          } else {
            setStateOptions([
              {
                value: "safe",
                label: "A salvo",
              },
              {
                value: "at_risk",
                label: "En riesgo",
              },
            ]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchZones();
    fetchUserReport();
  }, [institution]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="user-incident">
        <RoundedButton
          onClick={() => setShowModal(true)}
          buttonClass={{
            width: "200px",
            height: "200px",
            backgroundColor: "#F4D73B",
          }}
          text={"Actualizar reporte"}
        />
        {meetPoints ? (
          <div className="user-incident-meet-points">
            <h3>Puntos de encuentro</h3>
            <ul>
              {meetPoints.map((meetPoint) => (
                <li key={meetPoint.id}>
                  <strong>{meetPoint.name}</strong>: {meetPoint.description}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h3>
            Ingresa tú ubicación en el reporte para ver los puntos de encuentro
            más cercanos
          </h3>
        )}
      </section>
      <section className="user-incident">
        <h2>Protocolos</h2>
        <BrigadistTable />
      </section>
      <Modal
        closable={false}
        title={userReport ? "Actualiza tú reporte" : "Llena tú reporte"}
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
          userReport && (
            <Button
              key="cancel"
              color="danger"
              variant="solid"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
          ),
          <Button
            key="submit"
            type="primary"
            onClick={handleModal}
            disabled={
              userReport &&
              (userReport.state === "outside" || userReport.resolution)
            }
          >
            {userReport ? "Actualizar" : "Enviar"}
          </Button>,

          userReport &&
            userReport.state === "at_risk" &&
            !userReport.resolution &&
            state == "safe" && (
              <Button
                key="declare-safe"
                style={{ backgroundColor: "#2ade06", color: "white" }}
                onClick={() => handleDeclareSafe()}
              >
                Declararme a salvo
              </Button>
            ),
        ]}
      >
        <div className="user-incident-modal">
          <div className="user-incident-modal-inputs">
            <Select
              showSearch
              placeholder="Estado *"
              optionFilterProp="label"
              onChange={(value) => {
                setState(value);
                if (userReport && userReport.state === "at_risk") {
                  if (value === "safe") setDeclareSafe(true);
                  else setDeclareSafe(false);
                }
              }}
              style={{ width: "100%" }}
              defaultValue={
                userReport
                  ? userReport.resolution
                    ? userReport.resolution.state
                    : userReport.state
                  : null
              }
              disabled={
                userReport &&
                (userReport.state === "outside" || userReport.resolution)
              }
              options={stateOptions}
            />
            <Select
              showSearch
              placeholder="Ubicación"
              optionFilterProp="label"
              onChange={(value) => setLocation(value)}
              style={{ width: "100%" }}
              defaultValue={userReport ? userReport.zone_id : null}
              disabled={
                userReport &&
                (userReport.state === "outside" ||
                  userReport.resolution ||
                  declareSafe)
              }
              options={zoneOptions}
            />
          </div>
          <Tooltip
            placement="bottomLeft"
            title={
              declareSafe
                ? "Desribe por qué ya no te encuentras en riesgo"
                : "Descripción del reporte"
            }
          >
            <TextArea
              placeholder={
                declareSafe
                  ? "Desribe por qué ya no te encuentras en riesgo"
                  : "Descripción del reporte"
              }
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={
                userReport
                  ? userReport.resolution
                    ? userReport.resolution.description
                    : userReport.description
                  : null
              }
              disabled={
                userReport &&
                (userReport.state === "outside" || userReport.resolution)
              }
              style={{ height: 120 }}
            />
          </Tooltip>
        </div>
      </Modal>
    </>
  );
};
