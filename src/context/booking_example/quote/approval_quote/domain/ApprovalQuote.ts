import { Primitives } from "@utils/helper/Primitives";
import Quote, { QuoteProps } from "../../shared/domain/quote/Quote";
import QuoteApprovedStatus from "./QuoteApprovedStatus";
import CreationQuote from "../../creation_quote/domain/CreationQuote";

export default class ApprovalQuote extends Quote {

  declare readonly status: QuoteApprovedStatus;

  private constructor ( props: ApprovalQuoteProps ) {
    super( props );
  }

  toPrimitive (): Primitives<Quote> {
    return {
      ...super.toPrimitive(),
      status: this.status.valueOf()
    };
  }

  static convertFromCreationQuote ( props: CreationQuote ): ApprovalQuote {
    return new ApprovalQuote({
      ...props,
      status: QuoteApprovedStatus.create()
    });
  }
}

export type ApprovalQuoteProps = QuoteProps & {
    status: QuoteApprovedStatus;
};