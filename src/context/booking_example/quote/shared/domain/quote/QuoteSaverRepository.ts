import Quote from "./Quote";

export default interface QuoteSaverRepository <T extends Quote> {
    save( quote: T ): Promise<void>;
}