import TriggerEventType from "@utils/constant/TriggerEventType.enum";
import { APIGatewayProxyEvent } from "aws-lambda";

type APIGatewayProxyCustomEvent<Body = unknown, PathParameters = unknown, QueryStringParameters = unknown> = {
    version: string | symbol;
    eventSource: TriggerEventType;
    body: Body;
    path: PathParameters;
    queryStringParameters: QueryStringParameters;
} & APIGatewayProxyEvent;

export default APIGatewayProxyCustomEvent;