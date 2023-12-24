import { AuthServiceImpl } from "../../../../application/auth.service";
import { AuthService } from "../../../../application/contracts/services";

import { KeycloakAuth, LocalStorage } from "../../../../infra/gateways";

export const makeAuthService = (): AuthService => {
  const authGateway = KeycloakAuth.getInstance();

  authGateway.createClient({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  });

  const storage = LocalStorage.getInstance();
  const service = new AuthServiceImpl(authGateway, storage);
  return service;
};
