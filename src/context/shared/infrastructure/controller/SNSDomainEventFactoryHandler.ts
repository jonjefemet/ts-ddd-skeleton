import { SNSEventRecord } from "aws-lambda";

import Controller from "./Controller";
import { Container, inject, injectable } from "inversify";
import SNSCustomEvent, { SNSRecordCustom } from "./events/SNSCustomEvent";
import ConnectionClosingInterceptor from "../database/typeorm/ConnectionClosingInterceptor";
import Log from "@utils/decorators/Log";
import ConnectionOpeningInterceptor from "../database/typeorm/ConnectionOpeningInterceptor";
import Logger from "@utils/log/Logger";
import { DomainEventFailover } from "../eventBus/failover/DomainEventFailover";

@injectable()
export default abstract class SNSDomainEventFactoryHandler implements Controller<SNSCustomEvent, Array<PromiseSettledResult<SNSEventRecord>>> {

  protected abstract run( record: SNSRecordCustom ): Promise<SNSRecordCustom>;

  @inject( Container )
  private readonly container: Container;

  @inject( DomainEventFailover )
  private readonly failover: DomainEventFailover;

  @Log()
  async handle ( event: SNSCustomEvent<DomainEventFormat> ): Promise<Array<PromiseSettledResult<SNSEventRecord>>> {

    await ConnectionOpeningInterceptor.intercept( this.container ).open();

    const promises = await Promise.allSettled( event.Records.map( async ( record ) => {
      return this.run( record );
    }));

    await Promise.all( promises.map( async ( result, index ) => {
      if ( result.status === "rejected" ) {
        const record = event.Records[index];
        Logger.error( `Record ${JSON.stringify( record )} was rejected with reason: `, result.reason );
        await this.failover.publish(
          record.Sns.Message.data.id,
          record.Sns.MessageAttributes.EventName.Value,
          JSON.stringify({ data: record.Sns.Message }));
      }
    }));
    await ConnectionClosingInterceptor.intercept( this.container ).close();

    return promises;
  }

}

export type DomainEventFormat = {
  data: Data;
};

type Data = {
  id: string;
  type: string;
  occurredOn: string;
  aggregateId: string;
  attributes: { [key: string]: unknown };
};
