import { EnumValueObject } from "@shared/domain/valueObject/common/EnumValueObject";
import InvalidQuoteProposalTypeException from "./exceptions/InvalidQuoteProposalTypeException";

export enum QuoteProposalTypeEnum {
    BOOKING = "BOOKING",
}

export default class QuoteProposalType extends EnumValueObject<QuoteProposalTypeEnum> {

  constructor ( value: QuoteProposalTypeEnum ) {
    super( value, Object.values( QuoteProposalTypeEnum ));
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidQuoteProposalTypeException( this.valueOf());
  }
}