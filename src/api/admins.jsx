import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";
const { API_ROUTES } = ENV;

const AdminsController = {

  async setAdminRole(user_id) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${ENV.INSTITUTION_ID}/${API_ROUTES.ADMINISTRATORS}`;
    try {
      const response = await axiosInstance.post(url,{"users":[user_id]} );
      return response.data;
    } catch (error) {
      console.log("error al setear el admin",error);
      throw error;
    }
  },
};

export default AdminsController;
