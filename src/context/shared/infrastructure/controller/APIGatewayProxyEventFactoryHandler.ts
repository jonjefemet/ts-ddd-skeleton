import { Container, inject, injectable } from "inversify";
import Controller from "./Controller";
import APIGatewayProxyCustomEvent from "./events/APIGatewayProxyEventCustomEvent";
import ConnectionClosingInterceptor from "../database/typeorm/ConnectionClosingInterceptor";
import Log from "@utils/decorators/Log";
import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";

export type APIResponse = {
    statusCode?: HttpStatusCode;
    body?: unknown;
    headers?: Record<string, string>;
};
@injectable()
export default abstract class APIGatewayProxyEventFactoryHandler implements Controller<APIGatewayProxyCustomEvent, APIResponse> {

    protected abstract run( event: APIGatewayProxyCustomEvent ): Promise<APIResponse>;

    @inject( Container )
    private readonly container: Container;

    @Log()
    public async handle ( event: APIGatewayProxyCustomEvent ): Promise<APIResponse> {

      return await this.run( event ).finally( async () => {
        await ConnectionClosingInterceptor.intercept( this.container ).close();
      });

    }

}