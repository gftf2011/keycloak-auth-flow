import { AuthGateway } from '../contracts/gateways/auth';
import {
  UserService,
  MeInput,
  MeOutput,
  IntrospectionInput,
  IntrospectionOutput,
} from '../contracts/services/user';

export class UserServiceImpl implements UserService {
  constructor(private readonly authGate: AuthGateway) {}

  async me(input: MeInput): Promise<MeOutput> {
    const token = input.access_token.split(' ')[1];
    const response = await this.authGate.getUserInfo({
      access_token: token,
    });
    return response;
  }

  async introspection(input: IntrospectionInput): Promise<IntrospectionOutput> {
    const token = input.access_token.split(' ')[1];
    const response = await this.authGate.introspection({ access_token: token });
    return response;
  }
}
