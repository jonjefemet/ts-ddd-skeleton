import { MiddlewareObj, Request } from "@middy/core";
import { AWSEvents, EventsWithRecord } from "@shared/infrastructure/controller/events/Events";
import TriggerEventType from "@utils/constant/TriggerEventType.enum";
import Logger from "@utils/log/Logger";
import { RequestFactory } from "./RequestFactory";
import { SchemaClass } from "@utils/schema/types";
import HttpRequestParameter from "@utils/constant/HttpRequestParameter.enum";
import { ErrorResponseHandler, SuccessResponseHandler } from "@utils/middlewares/ResponseFactory";

type ClientRequestJoiSchema = {
  schema: SchemaClass;
  type: HttpRequestParameter;
};

type VersionType = typeof TriggerEventType;

export type VersionManagerType = { [key in keyof VersionType ]?: {
  default: symbol;
  [key: string]: symbol;
} };

export type MiddlewareParams = {

  validators?: {
    [symbol: symbol]: ClientRequestJoiSchema[];
  };
  version: VersionManagerType;
};
const obtainEventSource = ( event: AWSEvents ): TriggerEventType => {
  const eventWithRecord = event as EventsWithRecord;

  if ( Array.isArray( eventWithRecord?.Records ) && eventWithRecord.Records.length > 0 ) {
    const record = eventWithRecord.Records[ 0 ];

    return ( "body" in record )
      ? TriggerEventType.SQS
      : TriggerEventType.SNS;
  }

  return TriggerEventType.HTTP;
};

const HandlerMiddleware = ( params: MiddlewareParams ): MiddlewareObj => {

  const middlewareBefore = async ( request: Request<AWSEvents> ) => {
    Logger.run( "request", request );
    request.event.eventSource = obtainEventSource( request.event );
    await RequestFactory( request, params ).build( request.event.eventSource );
  };

  return {
    before: middlewareBefore,
    onError: ErrorResponseHandler,
    after: SuccessResponseHandler
  };
};

export { HandlerMiddleware };