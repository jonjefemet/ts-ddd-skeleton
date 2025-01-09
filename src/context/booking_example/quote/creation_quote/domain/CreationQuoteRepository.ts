import QuoteSaverRepository from "../../shared/domain/quote/QuoteSaverRepository";
import QuoteSearcherRepository from "../../shared/domain/quote/QuoteSearcherRepository";
import CreationQuote from "./CreationQuote";

export default interface CreationQuoteRepository extends
QuoteSaverRepository<CreationQuote>,
QuoteSearcherRepository<CreationQuote> {}