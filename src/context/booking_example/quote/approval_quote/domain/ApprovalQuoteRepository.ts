import QuoteSaverRepository from "../../shared/domain/quote/QuoteSaverRepository";
import ApprovalQuote from "./ApprovalQuote";

export default interface ApprovalQuoteRepository extends QuoteSaverRepository<ApprovalQuote> {

    save( quote: ApprovalQuote ): Promise<void>;
}