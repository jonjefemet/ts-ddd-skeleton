import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidQuoteStatusException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_QUOTE_STATUS_EXCEPTION",
      message: `Invalid quote status: ${value}`
    });
  }
}