import DatabaseCredentials from "@context/shared/infrastructure/database/DatabaseCredentials";
import DBConfig from "@shared/infrastructure/aws/secret/Structure";

export default function ( secret = {} as DBConfig ): DatabaseCredentials {
  return Object.freeze({
    host: secret?.host ?? process.env.DB_POSTGRES_HOST,
    port: Number( secret?.port ?? process.env.DB_POSTGRES_PORT ),
    username: secret?.username ?? process.env.DB_POSTGRES_USERNAME,
    password: secret?.password ?? process.env.DB_POSTGRES_PASSWORD,
    database: secret?.dbname ?? process.env.DB_POSTGRES_NAME
  });
}