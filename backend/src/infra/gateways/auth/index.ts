import url from 'url';
import axios from 'axios';

import {
  AuthGateway,
  GetUserInfoInput,
  GetUserInfoOutput,
  IntrospectionInput,
  IntrospectionOutput,
} from '../../../application/contracts/gateways/auth';

import { AccessTokenExpiredError } from '../../../application/errors';

export class KeycloakAuthGatewayImpl implements AuthGateway {
  constructor(
    private readonly baseUrl: string,
    private readonly realm: string,
    private readonly clientId: string,
    private readonly clientSecret: string,
  ) {}

  async getUserInfo(input: GetUserInfoInput): Promise<GetUserInfoOutput> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${input.access_token}`,
          },
        },
      );

      console.log(response.data);

      return response.data;
    } catch (e) {
      console.log(e);
      throw new AccessTokenExpiredError();
    }
  }

  async introspection(input: IntrospectionInput): Promise<IntrospectionOutput> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token/introspect`,
        new url.URLSearchParams({
          token: input.access_token,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (e) {
      console.log(e);
      throw new AccessTokenExpiredError();
    }
  }
}
