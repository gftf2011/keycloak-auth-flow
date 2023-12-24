/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace Storage {
  export enum KEYS {
    AUTH = "AUTH",
  }
}

export interface Storage {
  set: (key: string, value: object | null) => void;
  get: (key: string) => any;
  clear: () => void;
}
