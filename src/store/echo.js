import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { create } from "zustand";
import { ENV } from "../utils/constants";
import InstitutionController from "../api/institution";
import { institutionStore } from "../store/institution";
import { userStore } from "../store/user";
const { setInstitution, setIncident, setFlag } = institutionStore.getState();
const { syncUser } = userStore.getState();

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
    echo
      .private(`public-channel.${ENV.INSTITUTION_ID}`)
      .listen(".incidentCreation", async (data) => {
        console.log("RECIBI EL EVENTO");
        const { data: institution } =
          await InstitutionController.getInstitution(ENV.INSTITUTION_ID);
        setInstitution(institution);
        setIncident(institution.active_incident);
        setFlag(true);
        await syncUser(true);
      });
    echo
      .private(`public-channel.${ENV.INSTITUTION_ID}`)
      .listen(".incidentFinalization", async (data) => {
        console.log("incidentFinalization", data);
        setIncident(null);
        setFlag(false);
        await syncUser(true);
      });

    set({ echo });
  },
  cleanEcho: () => {
    echoStore.getState().echo?.disconnect();
    setEcho(null);
  },
}));
