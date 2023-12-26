import Keycloak, { KeycloakConfig } from "keycloak-js";

import {
  AuthGateway,
  GetClientInfoOutput,
} from "../../../application/contracts/gateways/auth";

export class KeycloakAuth implements AuthGateway {
  private client!: Keycloak;
  private static instance: KeycloakAuth;

  private constructor() {}

  static getInstance(): KeycloakAuth {
    if (!KeycloakAuth.instance) {
      KeycloakAuth.instance = new KeycloakAuth();
    }
    return KeycloakAuth.instance;
  }

  async initRegistrationOrLogin(config: KeycloakConfig): Promise<void> {
    this.client = new Keycloak(config);

    await this.client.init({
      onLoad: "login-required",
    });
  }

  getClientInfo(): GetClientInfoOutput {
    return {
      authenticated: this.client.authenticated!,
      access_token: this.client.token!,
      refresh_token: this.client.refreshToken!,
    };
  }
}
