import Keycloak, { KeycloakConfig } from "keycloak-js";

import {
  AuthGateway,
  GetClientInfoOutput,
} from "../../application/contracts/gateways/auth";

export class KeycloakAuth implements AuthGateway {
  private static client: Keycloak;
  private static instance: KeycloakAuth;
  private constructor() {}

  static getInstance(): KeycloakAuth {
    if (!KeycloakAuth.instance) {
      KeycloakAuth.instance = new KeycloakAuth();
    }
    return KeycloakAuth.instance;
  }

  createClient(config: KeycloakConfig): void {
    if (!KeycloakAuth.client) {
      KeycloakAuth.client = new Keycloak(config);
    }
  }

  async initRegistrationOrLogin(): Promise<void> {
    await KeycloakAuth.client.init({
      onLoad: "login-required",
    });
  }

  getClientInfo(): GetClientInfoOutput {
    return {
      authenticated: KeycloakAuth.client.authenticated!,
      access_token: KeycloakAuth.client.token!,
      refresh_token: KeycloakAuth.client.refreshToken!,
    };
  }
}
