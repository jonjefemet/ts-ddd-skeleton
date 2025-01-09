import TriggerEventType from "@utils/constant/TriggerEventType.enum";
import { SNSEvent, SNSEventRecord, SNSMessage } from "aws-lambda";

type SNSCustomEvent<Message = unknown> = {
    version: string | symbol;
    eventSource: TriggerEventType;
    Records: Array<SNSRecordCustom<Message>>;
} & SNSEvent;

export type SNSRecordCustom<Message = unknown> = {
    Sns: {
        Message: Message;
    } & SNSMessage;
} & SNSEventRecord;

export default SNSCustomEvent;