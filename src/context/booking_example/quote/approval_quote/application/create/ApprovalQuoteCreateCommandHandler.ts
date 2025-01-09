import { Command } from "@shared/domain/bus/command/Command";
import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import ApprovalQuoteCreateCommand from "./ApprovalQuoteCreateCommand";
import ApprovalQuoteCreator from "./ApprovalQuoteCreator";
import QuoteId from "@context/booking_example/quote/shared/domain/quote/QuoteId";
import ApprovalQuoteTypes from "../../ApprovalQuoteTypes";
import { inject, injectable } from "inversify";
import Log from "@utils/decorators/Log";

@injectable()
export default class ApprovalQuoteCreateCommandHandler implements CommandHandler<ApprovalQuoteCreateCommand> {

  constructor (
    @inject( ApprovalQuoteTypes.ApprovalQuoteCreator ) private readonly approvalQuoteCreator: ApprovalQuoteCreator
  ) { }

  subscribedTo (): Command {
    return ApprovalQuoteCreateCommand;
  }

  @Log()
  async handle ( command: ApprovalQuoteCreateCommand ): Promise<void> {

    await this.approvalQuoteCreator.create({
      id: new QuoteId( command.id )
    });

  }

}