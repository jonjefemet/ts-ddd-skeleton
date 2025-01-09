import { Query } from "@shared/domain/bus/query/Query";
import { QueryHandler } from "@shared/domain/bus/query/QueryHandler";
import { Response } from "@shared/domain/bus/query/Response";
import InfraestructureError from "@shared/domain/error/InfraestructureError";
import { InMemoryQueryBus } from "@shared/infrastructure/queryBus/InMemoryQueryBus";
import { QueryHandlers } from "@shared/infrastructure/queryBus/QueryHandlers";

class UnhandledQuery extends Query {
  static QUERY_NAME = "unhandled.query";
}

class HandledQuery extends Query {
  static QUERY_NAME = "handled.query";
}

class MyQueryHandler implements QueryHandler<Query, Response> {
  subscribedTo (): HandledQuery {
    return HandledQuery;
  }

  async handle (): Promise<Response> {
    return {};
  }
}

describe( "InMemoryQueryBus", () => {
  it( "throws an error if dispatches a query without handler", async () => {
    const unhandledQuery = new UnhandledQuery();
    const queryHandlers = new QueryHandlers([]);
    const queryBus = new InMemoryQueryBus( queryHandlers );

    expect( queryBus.ask( unhandledQuery )).rejects.toBeInstanceOf( InfraestructureError );
  });
  it( "accepts a query with handler", async () => {
    const handledQuery = new HandledQuery();
    const myQueryHandler = new MyQueryHandler();
    const queryHandlers = new QueryHandlers([
      myQueryHandler
    ]);
    const queryBus = new InMemoryQueryBus( queryHandlers );

    await queryBus.ask( handledQuery );
  });
});
