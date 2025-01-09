import ErrorCategory from "@utils/constant/ErrorCategory.enum";
import CustomErrorAbstractFactory from "@utils/error/CustomErrorAbstractFactory";
import Exception from "@utils/error/Exception";
import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";

/* La clase ValueObjectError es una clase de error personalizada que representa errores relacionados
con objetos de valor en un contexto empresarial. */
export default class ValueObjectError extends CustomErrorAbstractFactory {
  protected category: ErrorCategory = ErrorCategory.DOMAIN;

  name = "VALUE OBJECT ERROR";

  constructor ( exceptions: Exception | Exception[], httpStatusCode: HttpStatusCode = HttpStatusCode.BAD_REQUEST ) {
    super( exceptions, httpStatusCode );
  }
}