import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { serve } from "@hono/node-server"
import Logger from "@utils/log/Logger";

export class Server {
  private app: Hono;
  private port: string;

  constructor ( port: string ) {
    this.port = port;
    this.app = new Hono();
    this.app.use( "*", logger());
    this.app.use( "*", poweredBy());
    this.app.get( "/hello", ( c ) => c.text( "Hello, Hono!" ));
    this.app.get( "/api", ( c ) => {
      return c.json({ message: "XD!" });
    });
    this.app.notFound(( c ) => c.text( "Not Found", 404 ));
    this.app.onError(( err, c ) => {
      Logger.error( "Err:", err );

      return c.json( "Internal Server Error", 500 );
    });

  }

  listen () {
    Logger.info( `Listening on port ${this.port}` );
    serve({
      fetch: this.app.fetch.bind( this.app ),
      port: parseInt( this.port )
    });
  }

}
