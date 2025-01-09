import { EnumValueObject } from "@shared/domain/valueObject/common/EnumValueObject";
import InvalidQuoteTypeCategoryException from "./exceptions/InvalidQuoteTypeCategoryException";

export enum QuoteTypeCategoryEnum {
  STANDARD = "STANDARD",
  AGENCY = "AGENCY",
}

export default class QuoteTypeCategory extends EnumValueObject<QuoteTypeCategoryEnum> {

  constructor ( value: QuoteTypeCategoryEnum ) {
    super( value, Object.values( QuoteTypeCategoryEnum ));
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidQuoteTypeCategoryException( this.valueOf());
  }
}