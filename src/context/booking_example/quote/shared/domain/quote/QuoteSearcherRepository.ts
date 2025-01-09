import { Maybe } from "@utils/helper/Type";
import Quote from "./Quote";
import QuoteId from "./QuoteId";

export default interface QuoteSearcherRepository <T extends Quote> {
    search( id: QuoteId ): Promise<Maybe<T>>;
}