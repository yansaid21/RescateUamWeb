import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";

const { API_ROUTES } = ENV;

const ProtocolsController = {
  async createRiskSituation(data, risk_situation) {
    const url = `/institutions/${ENV.INSTITUTION_ID}/${API_ROUTES.RISK_SITUATION}/${risk_situation}/${API_ROUTES.PROTOCOLS}`;

    try {
      const response = await axiosInstance.post(url, data);

      console.log("respuesta despues del post protocol", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateRiskSituation(data, risk_situation, id_protocol) {
    const url = `/institutions/${ENV.INSTITUTION_ID}/${API_ROUTES.RISK_SITUATION}/${risk_situation}/${API_ROUTES.PROTOCOLS}/${id_protocol}`;

    try {
      const response = await axiosInstance.put(url, data);

      console.log("respuesta despues del put protocol", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async deleteRiskSituation(risk_situation, id_protocol) {
    const url = `/institutions/${ENV.INSTITUTION_ID}/${API_ROUTES.RISK_SITUATION}/${risk_situation}/${API_ROUTES.PROTOCOLS}/${id_protocol}`;

    try {
      const response = await axiosInstance.delete(url);

      console.log("respuesta despues del delete protocol", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getProtocols(risk_situation) {
    const url = `/institutions/${ENV.INSTITUTION_ID}/${API_ROUTES.RISK_SITUATION}/${risk_situation}/${API_ROUTES.PROTOCOLS}`;

    try {
      const response = await axiosInstance.get(url);

      console.log("respuesta despues del getProtocols", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getProtocol(risk_situation, id_protocol) {
    const url = `/institutions/${ENV.INSTITUTION_ID}/${API_ROUTES.RISK_SITUATION}/${risk_situation}/${API_ROUTES.PROTOCOLS}/${id_protocol}`;

    try {
      const response = await axiosInstance.get(url);

      console.log("respuesta despues del getProtocol", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default ProtocolsController;
