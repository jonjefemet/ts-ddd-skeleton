import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import { DummyCommand } from "./DummyCommand";

export class CommandHandlerDummy implements CommandHandler<DummyCommand> {
  subscribedTo (): DummyCommand {
    return DummyCommand;
  }

  async handle (): Promise<void> {}
}
