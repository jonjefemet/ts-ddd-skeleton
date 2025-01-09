import QuoteStatus, { QuoteStatusEnum } from "../../shared/domain/quote/QuoteStatus";
import InvalidQuoteApprovedStatusException from "./exceptions/InvalidQuoteApprovedStatusException";

export default class QuoteApprovedStatus extends QuoteStatus {

  constructor ( value: QuoteStatusEnum ) {
    super( value );
    this.ensureIsCreationStatus();
  }

  private ensureIsCreationStatus (): void {
    if ( this.valueOf() !== QuoteStatusEnum.CREATED ) {
      throw new InvalidQuoteApprovedStatusException( this.valueOf());
    }
  }

  static create (): QuoteApprovedStatus {
    return new QuoteApprovedStatus( QuoteStatusEnum.APPROVED );
  }

}