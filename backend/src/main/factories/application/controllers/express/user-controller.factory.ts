import { ExpressUserController } from '../../../../../application/controllers/express';
import { makeUserService } from '../../services';

export const makeUserController = () => {
  const service = makeUserService();
  const controller = new ExpressUserController(service);
  return controller;
};
