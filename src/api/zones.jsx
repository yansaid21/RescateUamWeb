import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";

const { API_ROUTES } = ENV;

const ZonesController = {
  async createZones(id_institution, data) {
    try {
      const response = await axiosInstance.post(
        `/institutions/${id_institution}/${API_ROUTES.ZONES}`,
        data,
      );

      console.log("respuesta despues del post createZones", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getZones(id_institution) {
    try {
      const response = await axiosInstance.get(
        `/institutions/${id_institution}/${API_ROUTES.ZONES}`,
      );

      console.log("respuesta despues del getZones", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default ZonesController;
