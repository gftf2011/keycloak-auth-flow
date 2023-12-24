import { AuthGateway } from "./contracts/gateways/auth";
import { Storage } from "./contracts/gateways/storage";
import { AuthService } from "./contracts/services";

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly storage: Storage
  ) {}
  async authenticate(): Promise<void> {
    await this.authGateway.initRegistrationOrLogin();
    // const info = this.authGateway.getClientInfo();
    // this.storage.set(Storage.KEYS.AUTH, {
    //   authenticated: info.authenticated,
    //   access_token: info.access_token,
    //   refresh_token: info.refresh_token,
    // });
  }
}
