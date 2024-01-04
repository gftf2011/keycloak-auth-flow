import { Express } from 'express';

import { makeUserController } from '../factories/application/controllers/express';
import { makeAuthMiddleware } from '../factories/application/middlewares/express';

export default (app: Express): void => {
  const controller = makeUserController();
  const middleware = makeAuthMiddleware();
  app.get(
    '/api/V1/user/me',
    async (req, res, next) => {
      await middleware.authenticate(req, res, next);
    },
    async (req, res) => {
      await controller.me(req, res);
    },
  );
};
