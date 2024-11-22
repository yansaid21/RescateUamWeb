import { axiosInstance } from "../config/axiosInstance";

const InstitutionsController = {
  async getInstitution(id_institution) {
    const url = `/institutions/${id_institution}`;
    try {
      const response = await axiosInstance.get(url);

      console.log("respuesta despues del updateIncident", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default InstitutionsController;
