import "./App.css";
import "typeface-fira-sans";
import { router } from "./config/routes";
import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { ENV, SECRET_KEY } from "./utils/constants";
import { userStore } from "./store/user";
import { echoStore } from "./store/echo";
import { Spinner } from "./components/atoms/Spinner/Spinner";
import CryptoJS from "crypto-js";
import { axiosInstance } from "./config/axiosInstance";
import InstitutionsController from "./api/institution";
import { institutionStore } from "./store/institution";

function App() {
  const { verifyToken } = userStore();
  const { initEcho } = echoStore();
  const { setInstitution, setIncident } = institutionStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      let sessionToken = localStorage.getItem("google");
      if (!sessionToken) {
        setIsLoading(false);
        return;
      }
      sessionToken = CryptoJS.AES.decrypt(sessionToken, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      );

      try {
        const verified = await verifyToken(sessionToken);
        if (verified) {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${sessionToken}`;
          initEcho(sessionToken);
          const institution = await InstitutionsController.getInstitution(
            ENV.INSTITUTION_ID
          );
          setInstitution(institution.data);
          setIncident(institution.data.active_incident);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("google");
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <RouterProvider router={router} fallbackElement={Spinner} />
      )}
    </>
  );
}

export default App;
