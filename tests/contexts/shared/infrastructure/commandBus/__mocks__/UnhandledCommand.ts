import { Command } from "@shared/domain/bus/command/Command";

export class UnhandledCommand extends Command {
  static COMMAND_NAME = "unhandled.command";
}
