import QuoteProposalType, { QuoteProposalTypeEnum } from "../../../shared/domain/quote_proposal/QuoteProposalType";
import InvalidQuoteProposalBookingTypeException from "./exceptions/InvalidQuoteProposalBookingTypeException";

export default class QuoteProposalBookingType extends QuoteProposalType {

  constructor ( value: QuoteProposalTypeEnum ) {
    super( value );
    this.ensureIsBookingType();
  }

  private ensureIsBookingType (): void {
    if ( this.valueOf() !== QuoteProposalTypeEnum.BOOKING ) {
      throw new InvalidQuoteProposalBookingTypeException( this.valueOf());
    }
  }

  static fromValue ( value: string ): QuoteProposalBookingType {
    return new QuoteProposalBookingType( value as QuoteProposalTypeEnum );
  }

}