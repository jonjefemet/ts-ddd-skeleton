import { inject, injectable } from "inversify";
import TypeORMClientTypes from "@shared/infrastructure/database/typeorm/TypeORMClientTypes";
import DataSourceClient from "@shared/infrastructure/database/typeorm/DataSourceClient";
import FailoverDomainEventsEntity from "./FailoverDomainEventsEntity";

type DatabaseEvent = {
	eventId: string;
	eventName: string;
	body: string;
};

@injectable()
export class DomainEventFailover {

  constructor (
        @inject( TypeORMClientTypes.SisturDataSourceClient ) private readonly dataSourceClient: DataSourceClient
  ) {}

  async publish ( eventId: string, eventName: string, serializedEvent: string ): Promise<void> {

    const connection = await this.dataSourceClient.getConnection();
    const repository = connection.getRepository( FailoverDomainEventsEntity );

    await repository.save({
      eventId,
      eventName,
      body: serializedEvent
    });
  }

  async consume ( total: number ): Promise<DatabaseEvent[]> {
    const connection = await this.dataSourceClient.getConnection();
    const repository = connection.getRepository( FailoverDomainEventsEntity );

    const result = await repository.find({
      select: [
        "id", "eventId", "eventName", "body"
      ],
      take: total
    });

    await repository.delete( result.map(({ id }) => id ));

    return result;
  }
}
