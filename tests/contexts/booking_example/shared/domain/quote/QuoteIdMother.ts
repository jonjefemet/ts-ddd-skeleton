import QuoteId from "@context/booking_example/quote/shared/domain/quote/QuoteId";
import { UuidMother } from "@tests/contexts/shared/domain/UuidMother";

export default class QuoteIdMother {
  static create ( value: string ): QuoteId {
    return new QuoteId( value );
  }

  static random (): QuoteId {
    return this.create( UuidMother.random());
  }
}