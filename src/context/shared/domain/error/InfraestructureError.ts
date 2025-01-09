import ErrorCategory from "@utils/constant/ErrorCategory.enum";
import CustomErrorAbstractFactory from "@utils/error/CustomErrorAbstractFactory";
import Exception from "@utils/error/Exception";
import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";

/* La clase InfraestructureError es una subclase de CustomError que representa errores relacionados con
problemas de infraestructura. */
export default class InfraestructureError extends CustomErrorAbstractFactory {
  protected category: ErrorCategory = ErrorCategory.INFRAESTRUCTURE;

  readonly name = "INFRAESTRUCTURE ERROR";

  constructor ( exceptions: Exception | Exception[], httpStatusCode: HttpStatusCode = HttpStatusCode.SERVICE_UNAVAILABLE ) {
    super( exceptions, httpStatusCode );
  }

  static create ( exceptions: Exception | Exception[], httpStatusCode: HttpStatusCode = HttpStatusCode.SERVICE_UNAVAILABLE ): InfraestructureError {
    return new InfraestructureError( exceptions, httpStatusCode );
  }

}