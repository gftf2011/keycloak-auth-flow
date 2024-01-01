/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  MeInput,
  MeOutput,
  UserGateway,
} from "../../../application/contracts/gateways/user";

export class AxiosUserGatewayImpl implements UserGateway {
  constructor(private readonly baseUrl: string) {}

  async me(input: MeInput): Promise<MeOutput> {
    const response = await axios.get(`${this.baseUrl}/api/V1/user/me`, {
      headers: {
        Authorization: `Bearer ${input.access_token}`,
      },
    });

    return response.data;
  }
}
