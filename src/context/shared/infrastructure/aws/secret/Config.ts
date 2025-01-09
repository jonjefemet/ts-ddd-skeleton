import Config from "@config/Config";
import DBConfig from "./Structure";
import { SecretConfig } from "./Types";

// Define un mapeo de tipos para mapear cada alias a su estructura correspondiente
type SecretStructureMap = {
    "db-sistur": DBConfig;
    "db-bounced-email": DBConfig;
};

const secretConfig: SecretConfig = {
  "db-sistur": Config.DB_SECRET_NAME,
  "db-bounced-email": Config.DB_SECRET_NAME
} as const;

export { secretConfig, SecretStructureMap };