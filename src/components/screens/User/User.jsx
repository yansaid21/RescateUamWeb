import { UserIncident } from "./UserIncident/UserIncident";
import { UserBase } from "./UserBase/UserBase";
import useIncidentNotification from "../../../hooks/useIncidentNotification";

export const User = () => {
  const { contextHolder, incident } = useIncidentNotification();
  return (
    <>
      {contextHolder}
      {incident ? <UserIncident /> : <UserBase />}
    </>
  );
};
