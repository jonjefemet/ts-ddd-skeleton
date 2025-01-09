import QuoteStatus, { QuoteStatusEnum } from "@context/booking_example/quote/shared/domain/quote/QuoteStatus";
import { secureRandom } from "@utils/helper/Random";

export default class QuoteStatusMother {
  static create ( value: QuoteStatusEnum ): QuoteStatus {
    return new QuoteStatus( value );
  }

  static random (): QuoteStatus {
    const status = Object.values( QuoteStatusEnum );
    const shuffled = status.sort(() => 0.5 - secureRandom());
    const [
      selectedStatus
    ] = shuffled.slice( 0, 2 );

    return this.create( selectedStatus );
  }
}