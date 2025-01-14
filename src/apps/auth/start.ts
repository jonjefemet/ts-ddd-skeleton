import Logger from "@utils/log/Logger";
import AuthBackendApp from "./AuthBackendApp";

try {
  new AuthBackendApp().start();
} catch ( e ) {
  Logger.error( "Error starting app", e );
  process.exit( 1 );
}

process.on( "uncaughtException", err => {
  Logger.error( "Uncaught exception", err );
  process.exit( 1 );
});
