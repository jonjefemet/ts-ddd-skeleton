import { Query } from "@shared/domain/bus/query/Query";
import { QueryHandlers } from "./QueryHandlers";
import { QueryBus } from "@shared/domain/bus/query/QueryBus";
import { Response } from "@shared/domain/bus/query/Response";

export class InMemoryQueryBus implements QueryBus {
  constructor ( private queryHandlersInformation: QueryHandlers ) {}

  async ask<R extends Response> ( query: Query ): Promise<R> {
    const handler = this.queryHandlersInformation.get( query );

    return ( await handler.handle( query )) as Promise<R>;
  }
}
