import Exception from "./Exception";
import { ResponseError } from "./ResponseError";

export default interface CustomError {
  exceptions: Exception[];
  name: string;
  format(): ResponseError;
  toString (): string;
}