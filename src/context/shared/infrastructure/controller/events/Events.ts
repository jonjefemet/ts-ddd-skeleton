import APIGatewayProxyCustomEvent from "./APIGatewayProxyEventCustomEvent";
import SNSCustomEvent from "./SNSCustomEvent";
import SQSCustomEvent from "./SQSCustomEvent";

export type AWSEvents = SQSCustomEvent | APIGatewayProxyCustomEvent | SNSCustomEvent;

export type EventsWithRecord = SNSCustomEvent | SQSCustomEvent;
