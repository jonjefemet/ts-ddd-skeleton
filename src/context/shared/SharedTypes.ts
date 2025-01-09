export default {
  DomainEventSubscriber: Symbol.for( "DomainEventSubscriber" ),
  EventBus: Symbol.for( "EventBus" ),
  CommandBus: Symbol.for( "InMemoryCommandBus" ),
  QueryBus: Symbol.for( "InMemoryQueryBus" ),
  CommandHandler: Symbol.for( "CommandHandler" ),
  QueryHandler: Symbol.for( "QueryHandler" ),
  ControllerInterceptor: Symbol.for( "ControllerInterceptor" )
};