import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";
const { API_ROUTES } = ENV;

const UserController = {
  async getUserInfo(id) {
    try {
      const response = await axiosInstance.get(
        `/${API_ROUTES.GET_USERS}/${id}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateUser(id, userData) {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", userData.name);
    formData.append("last_name", userData.last_name);
    formData.append("id_card", userData.id_card);

    if (userData.rhgb) formData.append("rhgb", userData.rhgb);
    if (userData.phone_number)
      formData.append("phone_number", userData.phone_number);
    if (userData.social_security)
      formData.append("social_security", userData.social_security);
    if (userData.photo) formData.append("photo", userData.photo);

    try {
      const response = await axiosInstance.post(
        `/${API_ROUTES.GET_USERS}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Response: ", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating user info:",
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  },
  async getRole(institutionId, userId) {
    try {
      const response = await axiosInstance.get(
        `/institutions/${institutionId}/users/${userId}`,
      );

      console.log("respuesta despues del getRole", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getProfile() {
    try {
      const response = await axiosInstance.get(`/profile`);

      console.log("respuesta despues del getProfile", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // Overload
  async getProfile(sessionToken) {
    try {
      const response = await axiosInstance.get(`/profile`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      console.log("respuesta despues del getProfile", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default UserController;
