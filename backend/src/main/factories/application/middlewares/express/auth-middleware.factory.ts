import { ExpressAuthMiddleware } from '../../../../../application/middlewares/express';
import { makeUserService } from '../../services';

export const makeAuthMiddleware = () => {
  const service = makeUserService();
  const middleware = new ExpressAuthMiddleware(service);
  return middleware;
};
