import axios from "axios";
import { ENV } from "../utils/constants";

export const axiosInstance = axios.create({
  baseURL: ENV.BASE_PATH,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
