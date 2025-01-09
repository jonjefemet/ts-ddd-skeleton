import { Primitives } from "@utils/helper/Primitives";
import EssentialForBooking from "@context/booking_example/booking/shared/domain/booking/EssentialForBooking";
import BookingArrivalDate from "@context/booking_example/booking/shared/domain/booking/BookingArrivalDate";
import BookingDepartureDate from "@context/booking_example/booking/shared/domain/booking/BookingDepartureDate";
import BookingId from "@context/booking_example/booking/shared/domain/booking/BookingId";
import QuoteProposalBookingType from "./QuoteProposalBookingType";
import QuoteProposal, { QuoteProposalProps } from "../../../shared/domain/quote_proposal/QuoteProposal";

export default class QuoteProposalBooking extends QuoteProposal implements EssentialForBooking {

  declare readonly id: BookingId;

  readonly departureDate: BookingDepartureDate;

  readonly arrivalDate: BookingArrivalDate;

  declare readonly type: QuoteProposalBookingType;

  declare readonly isApproved: boolean;

  private constructor ({
    id, departureDate, arrivalDate, isApproved, type
  }: QuoteProposalBookingProps ) {
    super();
    this.id = id;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.isApproved = isApproved;
    this.type = type;
  }

  toPrimitive (): Primitives<QuoteProposalBooking> {
    return {
      id: this.id.valueOf(),
      departureDate: this.departureDate,
      arrivalDate: this.arrivalDate,
      isApproved: this.isApproved,
      type: this.type.valueOf()
    };
  }

  static create ( props: QuoteProposalBookingProps ): QuoteProposalBooking {
    return new QuoteProposalBooking({
      ...props,
      isApproved: false
    });
  }
}

export type QuoteProposalBookingProps = {
    id: BookingId;
    departureDate: BookingDepartureDate;
    arrivalDate: BookingArrivalDate;
    type: QuoteProposalBookingType;
} & QuoteProposalProps;