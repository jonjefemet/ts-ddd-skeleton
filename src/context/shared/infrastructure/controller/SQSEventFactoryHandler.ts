import { SQSRecord } from "aws-lambda";

import Controller from "./Controller";
import SQSCustomEvent, { SQSRecordCustom } from "./events/SQSCustomEvent";
import { Container, inject, injectable } from "inversify";
import ConnectionClosingInterceptor from "../database/typeorm/ConnectionClosingInterceptor";
import Log from "@utils/decorators/Log";
import ConnectionOpeningInterceptor from "../database/typeorm/ConnectionOpeningInterceptor";

@injectable()
export default abstract class SQSEventFactoryHandler implements Controller<SQSCustomEvent, Array<PromiseSettledResult<SQSRecord>>> {

    protected abstract run( record: SQSRecordCustom ): Promise<SQSRecordCustom>;

    @inject( Container )
    private readonly container: Container;

    @Log()
    async handle ( event: SQSCustomEvent ): Promise<Array<PromiseSettledResult<SQSRecord>>> {

      await ConnectionOpeningInterceptor.intercept( this.container ).open();

      return await Promise.allSettled( event.Records.map( async ( record ) => {
        return this.run( record );
      })).finally( async () => {
        await ConnectionClosingInterceptor.intercept( this.container ).close();
      });
    }

}