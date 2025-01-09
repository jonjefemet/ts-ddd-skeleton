import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { SecretStructureMap } from "./Types";
import { secretConfig } from "./Config";
import Config from "@config/Config";

let instance: SecretManager;

class SecretManager {

  private client: SecretsManagerClient;

  private storege: Map<string, unknown>;

  constructor ( region: string ) {
    this.client = new SecretsManagerClient({ region });
    this.storege = new Map();
  }

  async getSecret<T extends keyof SecretStructureMap> ( alias: T ): Promise<SecretStructureMap[T]> {
    const secretName = secretConfig[alias];

    if ( !this.storege.has( secretName )) {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const data = await this.client.send( command );

      if ( "SecretString" in data ) {
        this.storege.set( secretName, JSON.parse( data.SecretString ));
      }
    }

    return this.storege.get( secretName ) as SecretStructureMap[T];
  }
}

if ( !instance ) {
  instance = new SecretManager( Config.AWS_REGION );
}

export default instance;