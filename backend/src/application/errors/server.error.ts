import { ApplicationError } from './application.error';

export class ServerError extends ApplicationError {
  constructor() {
    super();
    this.message = `server error`;
    this.name = ServerError.name;
  }
}
