import { AdminIncident } from "./AdminIncident/AdminIncident";
import { AdminBase } from "./AdminBase/AdminBase";
import useIncidentNotification from "../../../hooks/useIncidentNotification";

export const Admin = () => {
  const { contextHolder, incident } = useIncidentNotification();
  return (
    <>
      {contextHolder}
      {incident ? <AdminIncident /> : <AdminBase />}
    </>
  );
};
