import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";
import { isTestEnviroment } from "../helper/Stage";
import CustomError from "./CustomError";
import Exception from "./Exception";
import { ErrorMessage, ResponseError } from "./ResponseError";
import Config from "@config/Config";
import ErrorCategory from "@utils/constant/ErrorCategory.enum";

/* El código define una clase abstracta llamada "CustomError" que extiende la clase incorporada "Error"
en TypeScript. */
export default abstract class CustomErrorAbstractFactory extends Error implements CustomError {

  readonly exceptions: Exception[] = [];

  protected abstract readonly category: ErrorCategory;

  readonly httpStatusCode: HttpStatusCode;

  readonly abstract name: string;

  constructor ( exceptions: Exception | Exception[], httpStatusCode: HttpStatusCode ) {
    super();
    this.httpStatusCode = httpStatusCode;

    if ( Array.isArray( exceptions )) {
      this.exceptions = exceptions;
    } else {
      this.exceptions = [
        exceptions
      ];
    }
  }

  /**
   * La función formatea un seguimiento de la pila eliminando líneas que incluyen "node_modules".
   * @returns El método `formatStackTrace` devuelve una cadena.
   */
  private formatStackTrace (): string {
    const stackLines = this.stack?.split( "\n" );

    if ( stackLines && stackLines.length > 0 ) {

      const stack = stackLines
        .filter(( line: string ) => !line.includes( "node_modules" ))
        .join( "\n" );

      return stack;

    }

    return this.stack;
  }

  /**
   * La función `toString` devuelve una representación de cadena de un objeto, incluido su nombre,
   * mensaje y seguimiento de pila formateado.
   * @returns El método `toString()` devuelve una cadena que incluye el nombre y las propiedades del
   * mensaje del objeto, así como el seguimiento de la pila formateado.
   */
  toString (): string {
    return `${this.name}: ${this.message}\n${this.formatStackTrace()}`;
  }

  /**
   * La función da formato a los mensajes de error y al seguimiento de la pila según el entorno.
   * @returns Se devuelve un objeto con dos propiedades: "errores" y "pila".
   */
  format (): ResponseError {

    const isDevelopmentEnvironment = isTestEnviroment( Config.STAGE );

    const errors = this.exceptions.map(( exception ): ErrorMessage => {
      return {
        code: exception.code,
        type: isDevelopmentEnvironment
          ? this.name
          : undefined,
        category: this.category,
        description: isDevelopmentEnvironment
          ? exception.message
          : undefined
      };
    });

    return {
      errors,
      stack: isDevelopmentEnvironment
        ? this.formatStackTrace()
        : undefined
    };

  }
}
