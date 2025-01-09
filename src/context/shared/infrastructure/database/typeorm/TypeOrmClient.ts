import { DataSource, QueryRunner } from "typeorm";

export default interface TypeOrmClient {
  getConnection (): Promise<DataSource>;
  startTransaction (): Promise<QueryRunner>;
  getQueryRunner (): Promise<QueryRunner>;
  disconnect (): Promise<void>;
  createConnection (): Promise<void>;
}