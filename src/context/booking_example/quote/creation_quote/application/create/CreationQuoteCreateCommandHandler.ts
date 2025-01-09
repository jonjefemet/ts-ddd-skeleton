import { Command } from "@shared/domain/bus/command/Command";
import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import CreationQuoteCreateCommand from "./CreationQuoteCreateCommand";
import CreationQuoteCreator from "./CreationQuoteCreator";
import QuoteCreatedAt from "@context/booking_example/quote/shared/domain/quote/QuoteCreatedAt";
import QuoteExpiresAt from "@context/booking_example/quote/shared/domain/quote/QuoteExpiresAt";
import QuoteId from "@context/booking_example/quote/shared/domain/quote/QuoteId";
import QuoteProposals from "@context/booking_example/quote/shared/domain/quote/QuoteProposals";
import { inject, injectable } from "inversify";
import CreationQuoteTypes from "../../CreationQuoteTypes";
import Log from "@utils/decorators/Log";
import QuoteProposalFactory from "@context/booking_example/quote/shared/domain/quote_proposal/QuoteProposalFactory";
import QuoteTypeFactory from "@context/booking_example/quote/shared/domain/quote_type/QuoteTypeFactory";

@injectable()
export default class CreationQuoteCreateCommandHandler implements CommandHandler<CreationQuoteCreateCommand> {

  constructor (
    @inject( CreationQuoteTypes.CreationQuoteCreator ) private readonly creationQuoteCreator: CreationQuoteCreator
  ) { }

  subscribedTo (): Command {
    return CreationQuoteCreateCommand;
  }

  @Log()
  async handle ( command: CreationQuoteCreateCommand ): Promise<void> {

    const proposals = command.proposals.map( proposal => {
      return QuoteProposalFactory.createFromPrimitive({
        ...proposal,
        isApproved: false
      });
    });
    await this.creationQuoteCreator.create({
      id: new QuoteId( command.id ),
      type: QuoteTypeFactory.createFromPrimitive( command.type ),
      proposals: new QuoteProposals( ...proposals ),
      createdAt: new QuoteCreatedAt( command.createdAt ),
      expiresAt: new QuoteExpiresAt( command.expiresAt )
    });
  }

}