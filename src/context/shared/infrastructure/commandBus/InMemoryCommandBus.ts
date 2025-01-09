import { Command } from "@shared/domain/bus/command/Command";
import { CommandBus } from "@shared/domain/bus/command/CommandBus";
import { CommandHandlers } from "./CommandHandlers";
import { injectable } from "inversify";

@injectable()
export class InMemoryCommandBus implements CommandBus {
  constructor ( private commandHandlers: CommandHandlers ) {}

  async dispatch ( command: Command ): Promise<void> {
    const handler = this.commandHandlers.get( command );

    return await handler.handle( command );
  }
}
