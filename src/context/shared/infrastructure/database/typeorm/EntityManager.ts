import { inject, injectable } from "inversify";
import { EntityTarget, Repository } from "typeorm";
import TypeORMClientTypes from "./TypeORMClientTypes";
import TypeOrmClient from "./TypeOrmClient";

@injectable()
export default abstract class EntityManager<T> {

  constructor ( @inject( TypeORMClientTypes.SisturDataSourceClient ) private sisturDataSourceClient: TypeOrmClient ) {}

  protected repository: Repository<T>;
  protected abstract getEntity (): EntityTarget<T>;

  protected async setRepository (): Promise<void> {
    if ( !this.repository ) {
      const queryRunner = await this.sisturDataSourceClient.getQueryRunner();

      this.repository = queryRunner.manager.getRepository( this.getEntity());
    }
  }

  protected async getRepository (): Promise<Repository<T>> {
    await this.setRepository();

    return this.repository;
  }
}