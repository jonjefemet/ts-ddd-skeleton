/* eslint-disable no-console */
import Config from "../../config/Config";
import TestEnvironment from "../constant/TestEnvironment.constant";

export default class Logger {

  static run ( message: string, value: unknown = "" ) {
    const prefix = "\t 🚀 RUN -";

    console.info( `${prefix} ${message}`, value );
  }

  static done ( message: string, value: unknown = "" ) {
    const prefix = "\t ✅ DONE -";

    console.info( `${prefix} ${message}`, value );
  }

  static log ( message: string, value: unknown = "" ) {
    const prefix = "\t 🟡 LOG -";

    console.info( `${prefix} ${message}`, value );
  }

  static debug ( message: string, value: unknown = "" ): void {
    if ( TestEnvironment.some( testStage => testStage === Config.STAGE )) {
      const prefix = "\t 🟣 DEBUG -";

      console.log( `${prefix} ${message}`, value );
    }
  }

  static info ( message: string, value: unknown = "" ): void {
    const prefix = "\t 🔵 INFO -";

    console.info( `${prefix} ${message}`, value );
  }

  static error ( message: string, value: unknown = "" ): void {
    const prefix = "\t 🔴 ERROR -";

    console.error( `${prefix} ${message}`, value );
  }

  static time ( message: string ): void {
    const prefix = "\t 🕒 Time -";

    console.time( `${prefix} ${message}` );
  }

  static timeEnd ( message: string ): void {
    const prefix = "\t 🕒 Time -";

    console.timeEnd( `${prefix} ${message}` );
  }
}
