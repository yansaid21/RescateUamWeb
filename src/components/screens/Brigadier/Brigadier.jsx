import { BrigadierIncident } from "./BrigadierIncident/BrigadierIncident";
import { BrigadierBase } from "./BrigadierBase/BrigadierBase";
import useIncidentNotification from "../../../hooks/useIncidentNotification";

export const Brigadier = () => {
  const { contextHolder, incident } = useIncidentNotification();
  return (
    <>
      {contextHolder}
      {incident ? <BrigadierIncident /> : <BrigadierBase />}
    </>
  );
};
