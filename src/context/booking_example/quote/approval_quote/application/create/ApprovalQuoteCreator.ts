import CreationQuoteRepository from "@context/booking_example/quote/creation_quote/domain/CreationQuoteRepository";
import ApprovalQuoteRepository from "../../domain/ApprovalQuoteRepository";
import QuoteId from "@context/booking_example/quote/shared/domain/quote/QuoteId";
import ApprovalQuote from "../../domain/ApprovalQuote";
import { inject, injectable } from "inversify";
import ApprovalQuoteTypes from "../../ApprovalQuoteTypes";
import CreationQuoteTypes from "@context/booking_example/quote/creation_quote/CreationQuoteTypes";

@injectable()
export default class ApprovalQuoteCreator {

  constructor (
    @inject( ApprovalQuoteTypes.ApprovalQuoteRepository ) private readonly approvalQuoteRepository: ApprovalQuoteRepository,
    @inject( CreationQuoteTypes.CreationQuoteCreator ) private readonly creationQuoteRepository: CreationQuoteRepository
  ) { }

  async create ( props: ApprovalQuoteCreatorProps ): Promise<void> {
    const creationQuote = await this.creationQuoteRepository.search( props.id );

    const approvalQuote = ApprovalQuote.convertFromCreationQuote( creationQuote );

    await this.approvalQuoteRepository.save( approvalQuote );

  }
}

export type ApprovalQuoteCreatorProps = { id: QuoteId };