import ErrorCategory from "../constant/ErrorCategory.enum";
import CustomError from "./CustomError";
import CustomErrorAbstractFactory from "./CustomErrorAbstractFactory";
import Exception from "./Exception";
import HttpStatusCode from "../constant/HttpStatusCode.enum";

/* La clase DefaultError es una subclase de CustomError y representa un error interno desconocido del
servidor. */
export default class DefaultError extends CustomErrorAbstractFactory implements CustomError {
  protected category: ErrorCategory = ErrorCategory.UNKNOWN;

  name = "DEFAULT ERROR";

  constructor ( exceptions: Exception | Exception[], httpStatusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR ) {
    super( exceptions, httpStatusCode );
  }

}
