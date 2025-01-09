import { EnumValueObject } from "@shared/domain/valueObject/common/EnumValueObject";
import InvalidQuoteStatusException from "./exceptions/InvalidQuoteStatusException";

export enum QuoteStatusEnum {
    CREATED = "CREATED",
    APPROVED = "APPROVED",
    CONFIRMED = "CONFIRMED",
}
export default class QuoteStatus extends EnumValueObject<QuoteStatusEnum> {

  constructor ( value: QuoteStatusEnum ) {
    super( value, Object.values( QuoteStatusEnum ));
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidQuoteStatusException( this.valueOf());
  }

}