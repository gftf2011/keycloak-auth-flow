export type IntrospectionInput = {
  access_token: string;
};

export type IntrospectionOutput = {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  client_id: string;
  username: string;
  token_type: string;
  active: boolean;
};

export type GetUserInfoInput = {
  access_token: string;
};

export type GetUserInfoOutput = {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};

export interface AuthGateway {
  introspection: (input: IntrospectionInput) => Promise<IntrospectionOutput>;
  getUserInfo: (input: GetUserInfoInput) => Promise<GetUserInfoOutput>;
}
