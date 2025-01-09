import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidQuoteProposalBookingTypeException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_QUOTE_PROPOSAL_BOOKING_TYPE",
      message: `Invalid quote proposal booking type: ${value}`
    });
  }
}