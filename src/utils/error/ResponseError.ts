import ErrorCategory from "../constant/ErrorCategory.enum";

/* La `interfaz de exportación ErrorMessage` define una interfaz TypeScript. Una interfaz en TypeScript
es una forma de definir la forma o estructura de un objeto. En este caso, la interfaz `ErrorMessage`
define la estructura de un objeto de mensaje de error. */
export interface ErrorMessage {
    code: string;
    type?: string;
    category: ErrorCategory;
    description?: string;
}

/* La `interfaz de exportación ResponseError` está definiendo una interfaz en TypeScript. Esta interfaz
especifica la estructura de un objeto que representa un error de respuesta. Tiene dos propiedades: */
export interface ResponseError{
  errors: ErrorMessage[];
  stack?: string;
}