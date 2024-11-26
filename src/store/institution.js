import { create } from "zustand";

export const institutionStore = create((set) => ({
  institution: null,
  incident: null,
  flag: null,
  setInstitution: (institution) => {
    set({ institution });
  },
  setIncident: (incident) => {
    set({ incident });
  },
  setFlag: (flag) => {
    set({ flag });
  },
}));
