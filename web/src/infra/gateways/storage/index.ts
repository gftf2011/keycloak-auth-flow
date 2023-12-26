import { StorageGateway } from "../../../application/contracts/gateways/storage";

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum STORAGE_TYPE {
  SESSION = "SESSION",
  LOCAL = "LOCAL",
}

export class StorageImpl implements StorageGateway {
  private storage: Storage;

  constructor(private readonly type: STORAGE_TYPE) {
    this.storage =
      this.type === STORAGE_TYPE.LOCAL ? localStorage : sessionStorage;
  }

  set(key: string, value: object | null): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const response = this.storage.getItem(key);
    return response ? JSON.parse(response) : null;
  }

  clear(): void {
    this.storage.clear();
  }
}
