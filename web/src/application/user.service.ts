/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserGateway } from "./contracts/gateways/user";
import { StorageGateway } from "./contracts/gateways/storage";
import { MeOutput, UserService } from "./contracts/services/user";

export class UserServiceImpl implements UserService {
  constructor(
    private readonly userGateway: UserGateway,
    private readonly storageGateway: StorageGateway
  ) {}

  async me(): Promise<MeOutput> {
    const { access_token } = this.storageGateway.get(StorageGateway.KEYS.AUTH);
    const response = await this.userGateway.me({ access_token });
    return response;
  }
}
