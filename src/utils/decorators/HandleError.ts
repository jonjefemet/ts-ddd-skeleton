/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomErrorAbstractFactory from "../error/CustomErrorAbstractFactory";
import Logger from "../log/Logger";

/**
 * La función HandleError es un decorador de TypeScript que envuelve un método y detecta cualquier
 * error generado, lo vuelve a generar con un objeto de error personalizado e incluye el seguimiento de
 * la pila del error original.
 * @param {CustomErrorAbstractFactory} customError - El parámetro `customError` es una instancia de la clase
 * `CustomError`. Se utiliza para definir un objeto de error personalizado que se generará cuando
 * ocurra un error en el método decorado.
 * @returns La función `HandleError` devuelve una nueva función.
 */
export default function HandleError ( customError: CustomErrorAbstractFactory ) {
  return function ( _: any, __: string, descriptor: PropertyDescriptor ) {
    const targetMethod = descriptor.value;
    descriptor.value = async function ( ...args: any[]) {
      try {
        return await targetMethod.apply( this, args );
      } catch ( error ) {
        Logger.error( error.message, error );

        if ( error instanceof CustomErrorAbstractFactory ) {
          throw error;
        }

        customError.stack = error.stack;
        throw customError;
      }
    };
  };
}
