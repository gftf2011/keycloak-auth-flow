import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const client = new Keycloak({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      });

      const response = await client.init({ onLoad: "login-required" });

      setLoggedIn(response);
    };

    fetch();
  }, []);

  return loggedIn;
};
