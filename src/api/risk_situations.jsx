import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";

const { API_ROUTES } = ENV;

const RiskSituationsController = {
  async createRiskSituation(data, id_institution) {
    const url = `/institutions/${id_institution}/${API_ROUTES.RISK_SITUATION}/`;

    try {
      const response = await axiosInstance.post(url, data);

      console.log("respuesta despues del post risk_situation", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getRiskSituation(id_institution) {
    const url = `/institutions/${id_institution}/${API_ROUTES.RISK_SITUATION}`;

    try {
      const response = await axiosInstance.get(url);

      console.log("respuesta despues del getRiskSituation", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default RiskSituationsController;
