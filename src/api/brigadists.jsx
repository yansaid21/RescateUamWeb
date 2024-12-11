import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";
import { addQueryParams } from "./common";
const { API_ROUTES } = ENV;

const BrigadistsController = {
  async getActiveBrigadists(
    institution_id,
    risk_situation_id,
    incident_id,
    queryParams,
  ) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${institution_id}/${API_ROUTES.RISK_SITUATION}/${risk_situation_id}/${API_ROUTES.INCIDENT}/${incident_id}/brigadiers`;
    const urlWithParams = addQueryParams(url, queryParams);
    try {
      const response = await axiosInstance.get(urlWithParams);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default BrigadistsController;
