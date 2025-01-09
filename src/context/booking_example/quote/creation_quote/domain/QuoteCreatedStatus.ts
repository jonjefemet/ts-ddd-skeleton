import QuoteStatus, { QuoteStatusEnum } from "../../shared/domain/quote/QuoteStatus";
import InvalidQuoteCreatedStatusException from "./exceptions/InvalidQuoteCreatedStatusException";

export default class QuoteCreatedStatus extends QuoteStatus {

  constructor ( value: QuoteStatusEnum ) {
    super( value );
    this.ensureIsCreationStatus();
  }

  private ensureIsCreationStatus (): void {
    if ( this.valueOf() !== QuoteStatusEnum.CREATED ) {
      throw new InvalidQuoteCreatedStatusException( this.valueOf());
    }
  }

  static create (): QuoteCreatedStatus {
    return new QuoteCreatedStatus( QuoteStatusEnum.CREATED );
  }

}