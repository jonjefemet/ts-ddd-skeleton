import { Primitives } from "@utils/helper/Primitives";
import QuoteProposal, { QuoteProposalProps } from "./QuoteProposal";
import QuoteProposalType, { QuoteProposalTypeEnum } from "./QuoteProposalType";
import BookingId from "@context/booking_example/booking/shared/domain/booking/BookingId";
import BookingArrivalDate from "@context/booking_example/booking/shared/domain/booking/BookingArrivalDate";
import BookingDepartureDate from "@context/booking_example/booking/shared/domain/booking/BookingDepartureDate";
import { ProposalsTypes } from "../quote/QuoteProposals";
import QuoteProposalBooking, { QuoteProposalBookingProps } from "@context/booking_example/quote/quote_proposals/booking/domain/QuoteProposalBooking";
import QuoteProposalBookingType from "@context/booking_example/quote/quote_proposals/booking/domain/QuoteProposalBookingType";

export default class QuoteProposalFactory {

  static readonly types = new Map<QuoteProposalTypeEnum, ( props: QuoteProposalProps ) => ProposalsTypes>([
    [
      QuoteProposalTypeEnum.BOOKING, QuoteProposalBooking.create
    ]
  ]);

  static createFromPrimitive ( props: Primitives<QuoteProposal> ): ProposalsTypes {

    const quoteProps = QuoteProposalFactory.buildProps( props );

    const type = QuoteProposalFactory.types.get( quoteProps.type.valueOf() as QuoteProposalTypeEnum );

    if ( !type ) {
      throw new Error( `Invalid quote type category: ${ props.type.valueOf() }` );
    }

    return type( quoteProps );
  }

  static buildProps ( props: Primitives<QuoteProposal> ): QuoteProposalProps {
    const category = new QuoteProposalType( props.type as QuoteProposalTypeEnum );

    if ( category.valueOf() === QuoteProposalTypeEnum.BOOKING ) {
      return QuoteProposalFactory.buildPropsForQuoteProposalBooking( props as Primitives<QuoteProposalBooking> );
    }
  }

  private static buildPropsForQuoteProposalBooking ( props: Primitives<QuoteProposalBooking> ): QuoteProposalBookingProps {
    return {
      id: new BookingId ( props.id ),
      arrivalDate: new BookingArrivalDate( props.arrivalDate ),
      departureDate: new BookingDepartureDate( props.departureDate ),
      type: QuoteProposalBookingType.fromValue( props.type ),
      isApproved: props.isApproved
    };
  }

}