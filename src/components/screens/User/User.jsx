import { institutionStore } from "../../../store/institution";
import { UserIncident } from "./UserIncident/UserIncident";
import { UserBase } from "./UserBase/UserBase";

export const User = () => {
  const { incident } = institutionStore();
  return incident ? <UserIncident /> : <UserBase />;
};
