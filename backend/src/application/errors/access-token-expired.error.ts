import { ApplicationError } from './application.error';

export class AccessTokenExpiredError extends ApplicationError {
  constructor() {
    super();
    this.message = `user access token expired`;
    this.name = AccessTokenExpiredError.name;
  }
}
