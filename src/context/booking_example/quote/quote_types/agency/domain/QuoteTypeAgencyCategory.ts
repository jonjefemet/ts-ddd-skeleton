import QuoteTypeCategory, { QuoteTypeCategoryEnum } from "../../../shared/domain/quote_type/QuoteTypeCategory";
import InvalidQuoteTypeAgencyCategoryException from "./exceptions/InvalidQuoteTypeAgencyCategoryException";

export default class QuoteTypeAgencyCategory extends QuoteTypeCategory {

  constructor ( value: QuoteTypeCategoryEnum ) {
    super( value );
    this.ensureIsAgencyCategory();
  }

  private ensureIsAgencyCategory (): void {
    if ( this.valueOf() !== QuoteTypeCategoryEnum.AGENCY ) {
      throw new InvalidQuoteTypeAgencyCategoryException( this.valueOf());

    }
  }

  static create (): QuoteTypeAgencyCategory {
    return new QuoteTypeAgencyCategory( QuoteTypeCategoryEnum.AGENCY );
  }

  static fromValue ( value: string ): QuoteTypeAgencyCategory {
    return new QuoteTypeAgencyCategory( value as QuoteTypeCategoryEnum );
  }
}