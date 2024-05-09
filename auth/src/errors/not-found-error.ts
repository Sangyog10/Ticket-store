import { CustomError } from "./custom-error";

export class notFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, notFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: "Not found" }];
  }
}
