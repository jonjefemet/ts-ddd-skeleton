import { Query } from "@shared/domain/bus/query/Query";
import { Response } from "@shared/domain/bus/query/Response";
import { QueryHandler } from "@shared/domain/bus/query/QueryHandler";
import InfraestructureError from "@shared/domain/error/InfraestructureError";
import SharedExceptions from "@shared/domain/SharedExceptions";
import { Container } from "inversify";
import SharedTypes from "@shared/SharedTypes";

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor ( queryHandlers: Array<QueryHandler<Query, Response>> ) {
    super();
    queryHandlers.forEach( queryHandler => {
      this.set( queryHandler.subscribedTo(), queryHandler );
    });
  }

  public get ( query: Query ): QueryHandler<Query, Response> {
    const queryHandler = super.get( query.constructor );

    if ( !queryHandler ) {
      throw new InfraestructureError( SharedExceptions.QUERY_NOT_REGISTERED );
    }

    return queryHandler;
  }

  static create ( container: Container ): QueryHandlers {
    const commandHandlers = container.getAll<QueryHandler<Query, Response>>( SharedTypes.QueryHandler );

    return new QueryHandlers(
      commandHandlers
    );
  }
}
