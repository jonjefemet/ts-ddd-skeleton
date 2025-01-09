import { DomainEvent, DomainEventClass } from "@shared/domain/bus/event/DomainEvent";
import { DomainEventSubscriber } from "@shared/domain/bus/event/DomainEventSubscriber";
import EventBus from "@shared/domain/bus/event/EventBus";
import EventEmitter from "events";

import { injectable } from "inversify";

@injectable()
export default class InMemoryAsyncEventBus extends EventEmitter implements EventBus {

  addSubscribers ( subscribers: Array<DomainEventSubscriber<DomainEvent>> ): void {
    subscribers.forEach( subscriber => {
      subscriber.subscribedTo().forEach(( event: DomainEventClass ) => {
        this.on( event.eventName, subscriber.on.bind( subscriber ));
      });
    });
  }

  async publish ( events: DomainEvent[]): Promise<void> {
    const listenerPromises = [];
    events.forEach( event => {
      const domainEventClass = Object.getPrototypeOf( event ).constructor.name;
      this.listeners( domainEventClass ).forEach( listener => listenerPromises.push( listener( event )));
    });
    await Promise.all( listenerPromises );
  }

}