/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
export namespace StorageGateway {
  export enum KEYS {
    AUTH = "AUTH",
  }
}

export interface StorageGateway {
  set: (key: string, value: object | null) => void;
  get: (key: string) => any;
  clear: () => void;
}
