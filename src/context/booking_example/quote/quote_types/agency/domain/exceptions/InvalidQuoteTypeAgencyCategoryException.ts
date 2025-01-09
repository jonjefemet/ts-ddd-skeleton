import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidQuoteTypeAgencyCategoryException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_QUOTE_TYPE_AGENCY_CATEGORY",
      message: `Invalid quote type agency category: ${ value }`
    });
  }
}