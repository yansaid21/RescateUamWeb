import { ENV } from "../utils/constants";
import { axiosInstance } from "../config/axiosInstance";

const { API_ROUTES } = ENV;

const IncidentsController = {
  async createIncident(id_institution, id_risk_situation) {
    const url = `/institutions/${id_institution}/risk_situations/${id_risk_situation}/${API_ROUTES.INCIDENT}`;
    try {
      const response = await axiosInstance.post(url, {});

      console.log("respuesta despues del post createIncident", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateIncident(
    id_institution,
    id_risk_situation,
    description,
    id_incident,
  ) {
    const url = `/institutions/${id_institution}/risk_situations/${id_risk_situation}/${API_ROUTES.INCIDENT}/${id_incident}`;

    try {
      const response = await axiosInstance.put(url, { description });

      console.log("respuesta despues del updateIncident", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getIncidents(id_institution) {
    const url = `/institutions/${id_institution}/${API_ROUTES.INCIDENT}`;

    try {
      const response = await axiosInstance.get(url);

      console.log("respuesta despues del updateIncident", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getStatistics(id_institution, id_risk_situation, id_incident) {
    const url = `/institutions/${id_institution}/${API_ROUTES.RISK_SITUATION}/${id_risk_situation}/${API_ROUTES.INCIDENT}/${id_incident}/statistics`;

    try {
      const response = await axiosInstance.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default IncidentsController;
