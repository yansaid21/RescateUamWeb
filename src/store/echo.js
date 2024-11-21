import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { create } from "zustand";
import { ENV } from "../utils/constants";

export const echoStore = create((set) => ({
  echo: null,
  initEcho: (token) => {
    const echo = new Echo({
      broadcaster: "reverb",
      key: ENV.ECHO_KEY,
      wsHost: ENV.WS_HOST,
      wsPort: ENV.WS_PORT,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      authEndpoint: `${ENV.BASE_PATH}/broadcasting/auth`,
      auth: {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      },
      Pusher,
    });
    // echo.private(`privileged-channel.1`).listen(".userReportChange", (e) => {
    //   alert("General");
    //   console.log(e);
    // });
    set({ echo });
  },
}));
