import { Command } from "@shared/domain/bus/command/Command";

export class DummyCommand extends Command {
  static COMMAND_NAME = "handled.command";
}
