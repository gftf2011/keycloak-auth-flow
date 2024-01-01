import { Request, Response } from 'express';
import { UserService } from '../../contracts/services/user';
import {
  AccessTokenExpiredError,
  UserDoesNotExistsError,
  ServerError,
} from '../../errors';

export class ExpressUserController {
  constructor(private readonly userService: UserService) {}

  async me(
    req: Request<any, any, any, any, any>,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const response = await this.userService.me({
        access_token: req.headers.authorization,
      });
      return res.status(200).json(response);
    } catch (e) {
      if (e instanceof AccessTokenExpiredError) {
        return res.status(401).json(e);
      }
      if (e instanceof UserDoesNotExistsError) {
        return res.status(400).json(e);
      }
      return res.status(500).json(new ServerError());
    }
  }
}
