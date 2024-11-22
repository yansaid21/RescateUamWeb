import { create } from "zustand";

export const institutionStore = create((set) => ({
  institution: null,
  incident: null,
  setInstitution: (institution) => {
    set({ institution });
  },
  setIncident: (incident) => {
    set({ incident });
  },
}));
