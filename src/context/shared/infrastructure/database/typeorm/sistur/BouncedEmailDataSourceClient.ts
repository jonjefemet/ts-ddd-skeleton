import SecretClient from "@shared/infrastructure/aws/secret/SecretManager";
import Config from "@config/Config";
import Environment from "@utils/constant/Environment.enum";
import { injectable } from "inversify";
import { DataSourceOptions, EntitySchema, ObjectType } from "typeorm";
import DataSourceClient from "../DataSourceClient";
import SisturDBConfig from "src/config/SisturDBConfig";

@injectable()
export default class BouncedEmailDataSourceClient extends DataSourceClient {
  constructor ( private readonly entities: Array<ObjectType<unknown> | EntitySchema<unknown>> ) {
    super();
  }

  protected async buildDataSourceOptions (): Promise<DataSourceOptions> {
    const secret = Config.STAGE !== Environment.LOCAL
      ? await SecretClient.getSecret( "db-bounced-email" )
      : null;

    const bouncedEmailDBConfig = SisturDBConfig( secret );

    return {
      type: "mysql",
      ...bouncedEmailDBConfig,
      entities: this.entities,
      logging: true,
      synchronize: false,
      logger: "advanced-console"
    };
  }
}