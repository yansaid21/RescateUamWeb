const SERVER_IP = "rescueapi.xyz";
const SECURE = true;
export const SECRET_KEY =
  "quiñones:yXaNffqVUT2z9v6ESuJ/t8FJNWRAhbQWMNGR9Vcm1u0=";
// server dns rescueapi.xyz
// general route with http 127.0.0.1:8000
// Geral's house 192.168.20.21
// jean's house 192.168.1.12
// jean's iphone 172.20.10.14

export const ENV = {
  BASE_PATH: `${SECURE ? "https" : "http"}://${SERVER_IP}/api`,
  ECHO_KEY: "bjvoc9h7uopfewap6d26",
  WS_HOST: "localhost",
  WS_PORT: 8080,
  API_ROUTES: {
    REGISTER: "users",
    LOGIN: "auth/login",
    GET_USERS: "users",
    RISK_SITUATION: "risk_situations",
    INCIDENT: "incidents",
    MEETPOINT: "meet_points",
    ZONES: "zones",
    ROOMS: "rooms",
    INSTITUTIONS: "institutions",
  },
  INSTITUTION_ID: 1,
};
