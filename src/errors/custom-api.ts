import { StatusCodes } from "http-status-codes";

export default class CustomAPIError extends Error {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
  }
}
