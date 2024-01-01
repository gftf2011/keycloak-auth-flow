import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../contracts/services/user';

export class ExpressAuthMiddleware {
  constructor(private readonly userService: UserService) {}

  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const response = await this.userService.introspection({
        access_token: req.headers.authorization,
      });
      console.log(response);
      req.body = {
        ...req.body,
        email: response.email,
      };
      next();
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }
  }
}
