import { institutionStore } from "../store/institution";
import { notification } from "antd";
import { useEffect } from "react";

export default function useIncidentNotification() {
  const [api, contextHolder] = notification.useNotification();
  const { incident, flag } = institutionStore();
  const openNotification = (message, description, duration = 0) => {
    api.warning({
      message,
      description,
      duration,
      showProgress: true,
    });
  };

  useEffect(() => {
    console.log("INCIDENT", incident);
    if (flag === true) {
      openNotification(
        "Incidente",
        `Se ha reportado un incidente: ${incident?.risk_situation.name}`,
        10,
      );
    } else if (flag === false) {
      openNotification("Incidente", `Se ha cerrado el incidente activo`, 10);
    }
  }, [flag]);

  return { openNotification, contextHolder, incident };
}
