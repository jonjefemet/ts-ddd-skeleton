import { Command } from "@shared/domain/bus/command/Command";
import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import InfraestructureError from "@shared/domain/error/InfraestructureError";
import SharedExceptions from "@shared/domain/SharedExceptions";
import SharedTypes from "@shared/SharedTypes";
import { Container } from "inversify";

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor ( commandHandlers: Array<CommandHandler<Command>> ) {
    super();
    commandHandlers.forEach( commandHandler => {
      this.set( commandHandler.subscribedTo(), commandHandler );
    });
  }

  public get ( command: Command ): CommandHandler<Command> {
    const commandHandler = super.get( command.constructor );

    if ( !commandHandler ) {
      throw new InfraestructureError( SharedExceptions.COMMAND_NOT_REGISTERED );
    }

    return commandHandler;
  }

  static create ( container: Container ): CommandHandlers {
    const commandHandlers = container.getAll<CommandHandler<Command>>( SharedTypes.CommandHandler );

    return new CommandHandlers(
      commandHandlers
    );
  }
}
