/* eslint-disable no-console */
export default class System {
  static readonly out = {
    println: ( message?: string, ...optionalParams: unknown[]): void => {

      console.log( message, ...optionalParams );
    }
  };
}