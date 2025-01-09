import BookingArrivalDate from "./BookingArrivalDate";
import BookingDepartureDate from "./BookingDepartureDate";
import BookingId from "./BookingId";

export default interface EssentialForBooking {

    readonly id: BookingId;

    readonly departureDate: BookingDepartureDate;

    readonly arrivalDate: BookingArrivalDate;
}