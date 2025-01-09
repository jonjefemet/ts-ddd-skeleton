import { SNSEventRecord } from "aws-lambda";

import Controller from "./Controller";
import { Container, inject, injectable } from "inversify";
import SNSCustomEvent, { SNSRecordCustom } from "./events/SNSCustomEvent";
import ConnectionClosingInterceptor from "../database/typeorm/ConnectionClosingInterceptor";
import Log from "@utils/decorators/Log";
import ConnectionOpeningInterceptor from "../database/typeorm/ConnectionOpeningInterceptor";

@injectable()
export default abstract class SNSEventFactoryHandler implements Controller<SNSCustomEvent, Array<PromiseSettledResult<SNSEventRecord>>> {

  protected abstract run( record: SNSRecordCustom ): Promise<SNSRecordCustom>;

  @inject( Container )
  private readonly container: Container;

  @Log()
  async handle ( event: SNSCustomEvent ): Promise<Array<PromiseSettledResult<SNSEventRecord>>> {

    await ConnectionOpeningInterceptor.intercept( this.container ).open();

    return await Promise.allSettled( event.Records.map( async ( record ) => {
      return this.run( record );
    })).finally( async () => {
      await ConnectionClosingInterceptor.intercept( this.container ).close();
    });
  }

}