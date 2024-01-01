/* eslint-disable @typescript-eslint/no-explicit-any */
export type MeInput = {
  access_token: string;
};

export type MeOutput = any;

export interface UserGateway {
  me: (input: MeInput) => Promise<MeOutput>;
}
