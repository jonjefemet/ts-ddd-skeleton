import { Container } from "inversify";
import TypeORMClientTypes from "./TypeORMClientTypes";
import DataSourceClient from "./DataSourceClient";
import Logger from "@utils/log/Logger";

export default class ConnectionOpeningInterceptor {

  private dataSourceClients: DataSourceClient[];

  constructor ( dataSourceClients: DataSourceClient[]) {
    this.dataSourceClients = dataSourceClients;
  }

  public async open (): Promise<void> {
    Logger.info( "Open connections" );
    await Promise.all( this.dataSourceClients.map( async dataSourceClient => {
      await dataSourceClient.createConnection();
    }));
  }

  static intercept ( container: Container ): ConnectionOpeningInterceptor {
    const dataSourceClients = Object.values( TypeORMClientTypes ).flatMap( alias =>
      container.isBound( alias )
        ? container.getAll<DataSourceClient>( alias )
        : []
    );

    return new ConnectionOpeningInterceptor( dataSourceClients );

  }
}