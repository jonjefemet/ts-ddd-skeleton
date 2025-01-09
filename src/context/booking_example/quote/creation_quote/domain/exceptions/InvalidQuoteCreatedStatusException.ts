import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidQuoteCreatedStatusException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_QUOTE_CREATED_STATUS",
      message: `The quote status ${ value } is not valid for a created quote`
    });
  }
}