import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../application/contracts/services";

import { LocalStorage } from "../../infra/gateways";
// import Keycloak from "keycloak-js";

type Props = {
  authService: AuthService;
};

export const SignInPage: React.FC<Props> = ({ authService }) => {
  const navigate = useNavigate();

  const isRunning = useRef(false);

  useEffect(() => {
    console.log(LocalStorage.getInstance().get("AUTH"));
    if (isRunning.current) {
      return;
    }
    isRunning.current = true;

    const fetch = async (): Promise<void> => {
      // const client = new Keycloak({
      //   url: import.meta.env.VITE_KEYCLOAK_URL,
      //   realm: import.meta.env.VITE_KEYCLOAK_REALM,
      //   clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      // });

      // try {
      //   await client.init({
      //     onLoad: "login-required",

      //   });
      // } catch (e) {
      //   console.log(e);
      // }
      await authService.authenticate();
      navigate("/protected");
    };

    fetch();
  }, []);

  return <></>;
};
