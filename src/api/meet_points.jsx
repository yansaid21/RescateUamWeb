import { ENV } from "../utils/constants";
import { axiosInstance } from "../config/axiosInstance";

const { API_ROUTES } = ENV;

const MeetPointsController = {
  async createMeetPoint(id_institution, data) {
    const url = `/institutions/${id_institution}/${API_ROUTES.MEETPOINT}`;

    try {
      const response = await axiosInstance.post(url, data);

      console.log("respuesta despues del post createMeetPoint", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getMeetPoints(id_institution) {
    const url = `/institutions/${id_institution}/${API_ROUTES.MEETPOINT}`;

    try {
      const response = await axiosInstance.get(url);

      console.log("respuesta despues del getMeetPoints", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default MeetPointsController;
