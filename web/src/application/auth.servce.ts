import { AuthGateway } from "./contracts/gateways/auth";
import { StorageGateway } from "./contracts/gateways/storage";
import { AuthService } from "./contracts/services/auth";

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly url: string,
    private readonly realm: string,
    private readonly clientId: string,
    private readonly authGateway: AuthGateway,
    private readonly storageGateway: StorageGateway
  ) {}

  async authenticate(): Promise<void> {
    await this.authGateway.initRegistrationOrLogin({
      url: this.url,
      realm: this.realm,
      clientId: this.clientId,
    });
    const info = this.authGateway.getClientInfo();
    this.storageGateway.set(StorageGateway.KEYS.AUTH, {
      authenticated: info.authenticated,
      access_token: info.access_token,
      refresh_token: info.refresh_token,
    });
  }
}
