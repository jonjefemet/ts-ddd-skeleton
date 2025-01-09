import { Container } from "inversify";
import Types from "../../SharedTypes";
import Logger from "@utils/log/Logger";
import { DomainEventSubscriber } from "@shared/domain/bus/event/DomainEventSubscriber";
import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";

export default class DomainEventSubscribers {

  private constructor (
    public readonly subscribers: Array<DomainEventSubscriber<DomainEvent>>
  ) {
  }

  static create ( container: Container ): DomainEventSubscribers {
    const subscriberDefinitions = container.getAll<DomainEventSubscriber<DomainEvent>>( Types.DomainEventSubscriber );
    Logger.debug( "Subscriber attached", subscriberDefinitions );

    const subscribers = subscriberDefinitions.map(( subscriberDefinition ) => subscriberDefinition );

    return new DomainEventSubscribers( subscribers );
  }
}