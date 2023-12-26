/* eslint-disable @typescript-eslint/no-explicit-any */
export type GetClientInfoOutput = {
  authenticated: boolean;
  access_token: string;
  refresh_token: string;
};

export interface AuthGateway {
  initRegistrationOrLogin: (config: any) => Promise<void>;
  getClientInfo: () => GetClientInfoOutput;
}
