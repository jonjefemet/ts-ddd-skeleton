import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidQuoteProposalTypeException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_QUOTE_PROPOSAL_TYPE",
      message: `Invalid quote proposal type: ${value}`
    });
  }
}