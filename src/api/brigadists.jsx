import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";
const { API_ROUTES } = ENV;

const BrigadistsController = {
  async getActiveBrigadists(
    institution_id,
    risk_situation_id,
    incident_id,
    { page = 1, perPage = 15 },
  ) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${institution_id}/${API_ROUTES.RISK_SITUATION}/${risk_situation_id}/${API_ROUTES.INCIDENT}/${incident_id}/brigadiers?per_page=${perPage}&page=${page}`;
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async setBrigadistRole(user_id) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${ENV.INSTITUTION_ID}/${API_ROUTES.BRIGADIERS}`;
    try {
      const response = await axiosInstance.post(url,{"users":[user_id]} );
      return response.data;
    } catch (error) {
      console.log("error al setear el brigadista",error);
      throw error;
    }
  },
  async quitBrigadistRole(user_id) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${ENV.INSTITUTION_ID}/${API_ROUTES.BRIGADIERS}`;
    try {
      const response = await axiosInstance.delete(url, {
        data: { users: [user_id] }, // El cuerpo debe ir dentro de `data` en solicitudes DELETE.
      });
      return response.data;
    } catch (error) {
      console.log("error al setear el brigadista",error);
      throw error;
    }
  },


};

export default BrigadistsController;
