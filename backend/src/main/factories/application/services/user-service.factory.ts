import { UserServiceImpl } from '../../../../application/services';
import { KeycloakAuthGatewayImpl } from '../../../../infra/gateways/auth';

export const makeUserService = () => {
  const authGate = new KeycloakAuthGatewayImpl(
    process.env.KEYCLOAK_URL,
    process.env.KEYCLOAK_REALM,
    process.env.KEYCLOAK_CLIENT_ID,
    process.env.KEYCLOAK_CLIENT_SECRET,
  );
  const service = new UserServiceImpl(authGate);

  return service;
};
