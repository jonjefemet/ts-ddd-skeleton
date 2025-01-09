import { DomainEventJsonSerializer } from "./DomainEventJsonSerializer";
import EventBus from "@shared/domain/bus/event/EventBus";
import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";
import Logger from "@utils/log/Logger";

import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import Config from "@config/Config";
import { DomainEventFailover } from "./failover/DomainEventFailover";
import { inject, injectable } from "inversify";

@injectable()
export class AwsSimpleNotificationServiceEventBus implements EventBus {
  private readonly client = new SNSClient({
    region: Config.AWS_REGION
  });

  private readonly eventBusName = Config.SNS_EVENT_BUS_ARN;

  private readonly projectName = "booking-engine";

  constructor ( @inject( DomainEventFailover ) private readonly failover: DomainEventFailover ) {}

  async publish ( events: DomainEvent[]): Promise<void> {
    const promises = events.map( async ( event ) => {
      const serializedEvent = DomainEventJsonSerializer.serialize( event );

      await this.publishRaw( event.eventId, event.eventName, serializedEvent );
    });

    await Promise.all( promises );
  }

  async publishFromFailover (): Promise<void> {
    const events = await this.failover.consume( 10 );

    await Promise.all(
      events.map(( event ) => this.publishRaw( event.eventId, event.eventName, event.body ))
    );
  }

  private async publishRaw ( eventId: string, eventName: string, serializedEvent: string ) {
    try {

      Logger.info( "PUBLISHING" );

      return await this.client.send(
        new PublishCommand({
          TopicArn: this.eventBusName,
          Message: serializedEvent,
          Subject: eventName,
          MessageAttributes: {
            Source: {
              DataType: "String",
              StringValue: this.projectName
            }
          }
        })
      );

    } catch ( error: unknown ) {
      Logger.error( "ERROR PUBLISHING EVENT", error );

      return this.failover.publish( eventId, eventName, serializedEvent );
    }

  }
}
