/* eslint-disable @typescript-eslint/no-explicit-any */
export type MeOutput = any;

export interface UserService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  me: () => Promise<MeOutput>;
}
