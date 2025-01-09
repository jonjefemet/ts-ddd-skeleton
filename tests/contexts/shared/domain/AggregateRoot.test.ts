import AggregateRoot from "@shared/domain/aggregate/AggregateRoot";
import { DomainEvent, DomainEventAttributes } from "@shared/domain/bus/event/DomainEvent";

// AggregateRoot can pull recorded DomainEvents
it( "should pull recorded DomainEvents when pullDomainEvents is called", () => {

  class TestEvent extends DomainEvent {
    constructor () {
      super(
        "TestEvent",
        "123",
        "456",
        new Date( "2021-01-01" )
      );
    }

    toPrimitives (): DomainEventAttributes {
      return {};
    }
  }

  class TestAggregateRoot extends AggregateRoot {
    toPrimitive () {
      return {};
    }

    static create () {
      const test = new TestAggregateRoot();
      test.record( new TestEvent());

      return test;
    }
  }

  const aggregateRoot = TestAggregateRoot.create();

  const event = new TestEvent();

  const events = aggregateRoot.pullDomainEvents();

  expect( events ).toHaveLength( 1 );
  expect( events[0]).toEqual( event );
});