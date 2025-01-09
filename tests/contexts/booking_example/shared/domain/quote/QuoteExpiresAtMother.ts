import QuoteExpiresAt from "@context/booking_example/quote/shared/domain/quote/QuoteExpiresAt";
import { faker } from "@faker-js/faker";

export default class QuoteExpiresAtMother {
  static create ( value: Date ): QuoteExpiresAt {
    return new QuoteExpiresAt( value );
  }

  static random (): QuoteExpiresAt {
    return this.create( faker.date.future());
  }
}