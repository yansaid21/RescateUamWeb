import { institutionStore } from "../../../store/institution";
import { BrigadierIncident } from "./BrigadierIncident/BrigadierIncident";
import { BrigadierBase } from "./BrigadierBase/BrigadierBase";

export const Brigadier = () => {
  const { incident } = institutionStore();
  return incident ? <BrigadierIncident /> : <BrigadierBase />;
};
