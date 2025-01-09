import Log from "@utils/decorators/Log";
import UseCase from "./UseCase";
import { injectable } from "inversify";
import Logger from "@utils/log/Logger";

@injectable()
export default abstract class ConnectorAbstractFactory<T, U> implements UseCase<T, Promise<U>> {

  /* La línea `protected abstract connect(): Promise<void>;` declara un método abstracto llamado
  `connect` en la clase `ConnectorAbstractFactory`. Este método está protegido, lo que
  significa que solo se puede acceder a él dentro de la clase y sus subclases. El método tiene un
  tipo de retorno de `Promise<void>`, lo que indica que devuelve una promesa que se resuelve como
  `void`. */
  protected abstract connect(): Promise<void>;
  /* La línea `protected abstract desconexión(): Promise<void>;` declara un método abstracto llamado
  `disconnect` en la clase `ConnectorAbstractFactory`. Este método está protegido, lo que
  significa que solo se puede acceder a él dentro de la clase y sus subclases. El método tiene un
  tipo de retorno de `Promise<void>`, lo que indica que devuelve una promesa que se resuelve como
  `void`. */
  protected abstract disconnect(): Promise<void>;
  /* <html>La línea `operación abstracta protegida (puerto?: T): Promesa <U>;` declara un método
  abstracto llamado `operación` en la clase `ConnectorAbstractFactory`. Este método está
  protegido, lo que significa que solo se puede acceder a él dentro de la clase y sus subclases.</u> */
  protected abstract operation( port?: T ): Promise<U>;

  @Log()
  /**
   * Esta función se conecta a un servidor, realiza una operación (con un parámetro de puerto
   * opcional), registra cualquier error y luego se desconecta del servidor.
   * @param {T} [port] - El parámetro `port` es un parámetro opcional de tipo `T`. Se utiliza para
   * especificar un puerto en el que se realizará la operación. Si se proporciona un puerto, se llamará
   * al método de "operación" con el puerto especificado. Si no se proporciona ningún puerto, el método
   * de "operación"
   * @returns La función `ejecutar` devuelve una promesa de tipo `U`.
   */
  async execute ( port?: T ): Promise<U> {
    try {
      await this.connect();

      if ( port ) return await this.operation( port );

      return await this.operation();

    } catch ( error ) {
      Logger.error( error );
      throw error;
    } finally {
      await this.disconnect();
    }
  }

}