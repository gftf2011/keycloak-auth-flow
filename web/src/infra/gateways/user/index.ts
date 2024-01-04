/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import {
  MeInput,
  MeOutput,
  UserGateway,
} from "../../../application/contracts/gateways/user";

export class AxiosUserGatewayImpl implements UserGateway {
  constructor(private readonly baseUrl: string) {}

  async me(input: MeInput): Promise<MeOutput> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/V1/user/me`, {
        headers: {
          Authorization: `Bearer ${input.access_token}`,
        },
      });

      return response.data;
    } catch (e) {
      const error = new Error();
      const axiosError: AxiosError = e as any;
      error.name = axiosError.response?.data.name;
      error.message = axiosError.response?.data.message;
      throw error;
    }
  }
}
