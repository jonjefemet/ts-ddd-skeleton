import Logger from "@utils/log/Logger";
import { injectable } from "inversify";
import { DataSource, DataSourceOptions, QueryRunner } from "typeorm";
import TypeOrmClient from "./TypeOrmClient";

@injectable()
export default abstract class DataSourceClient implements TypeOrmClient {

  protected abstract buildDataSourceOptions(): Promise<DataSourceOptions>;

  private connection: DataSource;

  private async init (): Promise<void> {
    if ( !this.connection ) {
      const options = await this.buildDataSourceOptions();
      this.connection = new DataSource( options );
    }

    if ( !this.connection.isInitialized ) {
      Logger.info( "Connected to database" );
      await this.connection.initialize();
    }
  }

  async getConnection (): Promise<DataSource> {
    try {
      await this.init();

      return this.connection;
    } catch ( error ) {
      Logger.error( "Error initializing connection", error );
      this.connection = null;
    }
  }

  async startTransaction (): Promise<QueryRunner> {
    await this.init();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    return queryRunner;
  }

  async getQueryRunner (): Promise<QueryRunner> {
    await this.init();

    const queryRunner = this.connection.createQueryRunner();

    return queryRunner;
  }

  async disconnect (): Promise<void> {
    if ( this.connection?.isInitialized ) {
      Logger.info( "Disconnecting from database" );
      await this.connection.destroy();
    }
  }

  async createConnection (): Promise<void> {
    await this.init();
  }
}