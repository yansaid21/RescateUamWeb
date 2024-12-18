import { axiosInstance } from "../config/axiosInstance";
import { ENV } from "../utils/constants";
import { addQueryParams } from "./common.jsx";
const { API_ROUTES } = ENV;

const UserReportsController = {
  async getUserReports(
    institution_id,
    risk_situation_id,
    incident_id,
    queryParams,
  ) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${institution_id}/${API_ROUTES.RISK_SITUATION}/${risk_situation_id}/${API_ROUTES.INCIDENT}/${incident_id}/user_reports`;
    const urlWithParams = addQueryParams(url, queryParams);
    try {
      const response = await axiosInstance.get(urlWithParams);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getUserReportInActiveIncident(institution_id) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${institution_id}/user_reports`;
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async createUserReport(institution_id, risk_situation_id, incident_id, data) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${institution_id}/${API_ROUTES.RISK_SITUATION}/${risk_situation_id}/${API_ROUTES.INCIDENT}/${incident_id}/user_reports`;
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateUserReport(
    institution_id,
    risk_situation_id,
    incident_id,
    report_id,
    data,
  ) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${institution_id}/${API_ROUTES.RISK_SITUATION}/${risk_situation_id}/${API_ROUTES.INCIDENT}/${incident_id}/user_reports/${report_id}`;
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async userReportResolution(
    institution_id,
    risk_situation_id,
    incident_id,
    report_id,
    data,
  ) {
    const url = `/${API_ROUTES.INSTITUTIONS}/${institution_id}/${API_ROUTES.RISK_SITUATION}/${risk_situation_id}/${API_ROUTES.INCIDENT}/${incident_id}/user_reports/${report_id}/resolution`;
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default UserReportsController;
