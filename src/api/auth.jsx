import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";

const { API_ROUTES } = ENV;

const AuthController = {
  async register(data) {
    try {
      const response = await axiosInstance.post(
        `/${API_ROUTES.REGISTER}`,
        data,
      );

      console.log("response desde auth register -> ", response);

      return response.data;
    } catch (error) {
      console.log("data ", data);

      if (error.response) {
        console.error("Error al hacer register", error.response.data);
      } else {
        console.error("Error al hacer register", error.message);
      }
      throw error;
    }
  },

  async login(data) {
    data.institution = ENV.INSTITUTION_ID;
    const noActive = {
      active: false,
    };
    try {
      const response = await axiosInstance.post(`/${API_ROUTES.LOGIN}`, data);
      console.log("retorno el json en auto login", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al hacer login", error);
      return noActive;
    }
  },
};

export default AuthController;
