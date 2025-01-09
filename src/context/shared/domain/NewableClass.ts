/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* El código define una interfaz llamada "NewableClass" que extiende la interfaz incorporada "Función".
Esta interfaz se utiliza para representar una clase de la que se puede crear una instancia con la
palabra clave "nueva". */
export interface NewableClass<T> extends Function {
  new ( ...args: unknown[]): T;
}
