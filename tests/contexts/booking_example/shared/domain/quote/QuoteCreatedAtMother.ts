import QuoteCreatedAt from "@context/booking_example/quote/shared/domain/quote/QuoteCreatedAt";
import { faker } from "@faker-js/faker";

export default class QuoteCreatedAtMother {
  static create ( value: Date ): QuoteCreatedAt {
    return new QuoteCreatedAt( value );
  }

  static random (): QuoteCreatedAt {
    return this.create( faker.date.recent());
  }
}