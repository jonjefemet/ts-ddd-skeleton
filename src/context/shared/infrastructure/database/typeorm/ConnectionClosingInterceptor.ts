import { Container } from "inversify";
import TypeORMClientTypes from "./TypeORMClientTypes";
import DataSourceClient from "./DataSourceClient";
import Logger from "@utils/log/Logger";

export default class ConnectionClosingInterceptor {

  private dataSourceClients: DataSourceClient[];

  constructor ( dataSourceClients: DataSourceClient[]) {
    this.dataSourceClients = dataSourceClients;
  }

  public async close (): Promise<void> {
    Logger.info( "Closing connections" );
    await Promise.allSettled( this.dataSourceClients.map( async dataSourceClient => {
      await dataSourceClient.disconnect();
    }));
  }

  static intercept ( container: Container ): ConnectionClosingInterceptor {
    const dataSourceClients = Object.values( TypeORMClientTypes ).flatMap( alias =>
      container.isBound( alias )
        ? container.getAll<DataSourceClient>( alias )
        : []
    );

    return new ConnectionClosingInterceptor( dataSourceClients );

  }
}