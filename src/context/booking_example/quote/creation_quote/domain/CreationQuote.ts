import { Primitives } from "@utils/helper/Primitives";
import Quote, { QuoteProps } from "../../shared/domain/quote/Quote";
import QuoteCreatedStatus from "./QuoteCreatedStatus";

export default class CreationQuote extends Quote {

  declare readonly status: QuoteCreatedStatus;

  private constructor ( props: CreationQuoteProps ) {
    super( props );
  }

  toPrimitive (): Primitives<Quote> {
    return {
      ...super.toPrimitive(),
      status: this.status.valueOf()
    };
  }

  static create ( props: Omit<CreationQuoteProps, "status"> ): CreationQuote {
    return new CreationQuote({
      ...props,
      status: QuoteCreatedStatus.create()
    });
  }
}

export type CreationQuoteProps = QuoteProps & {
    status: QuoteCreatedStatus;
};