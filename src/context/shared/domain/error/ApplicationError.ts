import ErrorCategory from "@utils/constant/ErrorCategory.enum";
import CustomErrorAbstractFactory from "@utils/error/CustomErrorAbstractFactory";
import Exception from "@utils/error/Exception";
import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";

export default class ApplicationError extends CustomErrorAbstractFactory {
  protected category: ErrorCategory = ErrorCategory.APPLICATION;

  readonly name = "APPLICATION ERROR";

  constructor ( exceptions: Exception | Exception[], httpStatusCode: HttpStatusCode = HttpStatusCode.PRECONDITION_FAILED ) {
    super( exceptions, httpStatusCode );
  }
}