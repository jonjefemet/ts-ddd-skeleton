import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidQuoteApprovedStatusException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_QUOTE_APPROVED_STATUS",
      message: `The quote status ${ value } is not valid for an approved quote`
    });
  }
}