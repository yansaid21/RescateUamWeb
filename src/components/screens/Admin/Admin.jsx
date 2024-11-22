import { institutionStore } from "../../../store/institution";
import { AdminIncident } from "./AdminIncident/AdminIncident";
import { AdminBase } from "./AdminBase/AdminBase";

export const Admin = () => {
  const { incident } = institutionStore();
  return incident ? <AdminIncident /> : <AdminBase />;
};
