import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

export default class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
