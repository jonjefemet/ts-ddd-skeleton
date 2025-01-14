import { Server } from "./server";

export default class AuthBackendApp {

  private server?: Server;

  async start () {
    const port = process.env.PORT || "5001";
    this.server = new Server( port );
    await this.configureEventBus();

    return this.server.listen();
  }

  async stop () {
    // const rabbitMQConnection = container.get<RabbitMqConnection>( "Auth.Shared.RabbitMQConnection" );
    // await rabbitMQConnection.close();
    // // Hono does not provide a direct way to stop the server
    // console.log( "Server stopped" );
  }

  private async configureEventBus () {
    // const eventBus = container.get<EventBus>( "Auth.Shared.domain.EventBus" );
    // const rabbitMQConnection = container.get<RabbitMqConnection>( "Auth.Shared.RabbitMQConnection" );
    // await rabbitMQConnection.connect();
    // eventBus.addSubscribers( DomainEventSubscribers.from( container ));
  }
}