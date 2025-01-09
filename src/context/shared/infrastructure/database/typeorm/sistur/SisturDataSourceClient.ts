import SecretClient from "@shared/infrastructure/aws/secret/SecretManager";
import Config from "@config/Config";
import Environment from "@utils/constant/Environment.enum";
import { injectable } from "inversify";
import { DataSourceOptions, EntitySchema, ObjectType } from "typeorm";
import DataSourceClient from "../DataSourceClient";
import SisturDBConfig from "src/config/SisturDBConfig";

@injectable()
export default class SisturDataSourceClient extends DataSourceClient {
  constructor ( private readonly entities: Array<ObjectType<unknown> | EntitySchema<unknown>> ) {
    super();
  }

  protected async buildDataSourceOptions (): Promise<DataSourceOptions> {
    const secret = Config.STAGE !== Environment.LOCAL
      ? await SecretClient.getSecret( "db-sistur" )
      : null;

    const sisturDBConfig = SisturDBConfig( secret );

    return {
      type: "mysql",
      ...sisturDBConfig,
      entities: this.entities,
      logging: false,
      synchronize: false
    };
  }
}