import TriggerEventType from "@utils/constant/TriggerEventType.enum";
import { SQSEvent, SQSRecord } from "aws-lambda";

type SQSCustomEvent<Body = unknown> = {
    version: string | symbol;
    eventSource: TriggerEventType;
    Records: Array<SQSRecordCustom<Body>>;
} & SQSEvent;

export type SQSRecordCustom<Body = unknown> = {
    body: Body;
} & SQSRecord;

export default SQSCustomEvent;