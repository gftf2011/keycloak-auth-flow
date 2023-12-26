import { AuthServiceImpl } from "../../../../application";

import { KeycloakAuth } from "../../../../infra/gateways/auth";
import { STORAGE_TYPE, StorageImpl } from "../../../../infra/gateways/storage";

import { SignInPage } from "../../../../presentation/pages";

export const makeSignIn: React.FC = () => {
  const storage = new StorageImpl(STORAGE_TYPE.LOCAL);
  const authGateway = KeycloakAuth.getInstance();

  const service = new AuthServiceImpl(
    import.meta.env.VITE_KEYCLOAK_URL,
    import.meta.env.VITE_KEYCLOAK_REALM,
    import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    authGateway,
    storage
  );
  return <SignInPage authService={service} />;
};
