import { Primitives } from "@utils/helper/Primitives";
import { DomainEvent } from "../bus/event/DomainEvent";

export default abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  public pullDomainEvents (): DomainEvent[] {
    const events = this.domainEvents.slice();
    this.domainEvents = [];

    return events;
  }

  protected record ( event: DomainEvent ): void {
    this.domainEvents.push( event );
  }

  abstract toPrimitive (): Primitives<unknown>;

}