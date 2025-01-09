import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidQuoteTypeCategoryException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_QUOTE_TYPE_CATEGORY",
      message: `The quote type category <${value}> is invalid`
    });
  }
}