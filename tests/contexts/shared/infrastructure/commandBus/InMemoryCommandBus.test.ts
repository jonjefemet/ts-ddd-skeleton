import { CommandHandlers } from "@shared/infrastructure/commandBus/CommandHandlers";
import { UnhandledCommand } from "./__mocks__/UnhandledCommand";
import { InMemoryCommandBus } from "@shared/infrastructure/commandBus/InMemoryCommandBus";
import { DummyCommand } from "./__mocks__/DummyCommand";
import { CommandHandlerDummy } from "./__mocks__/CommandHandlerDummy";
import InfraestructureError from "@shared/domain/error/InfraestructureError";

describe( "InMemoryCommandBus", () => {
  it( "throws an error if dispatches a command without handler", async () => {
    const unhandledCommand = new UnhandledCommand();
    const commandHandlers = new CommandHandlers([]);
    const commandBus = new InMemoryCommandBus( commandHandlers );

    await expect( commandBus.dispatch( unhandledCommand )).rejects.toBeInstanceOf( InfraestructureError );
  });
  it( "accepts a command with handler", async () => {
    const dummyCommand = new DummyCommand();
    const commandHandlerDummy = new CommandHandlerDummy();
    const commandHandlers = new CommandHandlers([
      commandHandlerDummy
    ]);
    const commandBus = new InMemoryCommandBus( commandHandlers );

    await commandBus.dispatch( dummyCommand );
  });
});
