import AggregateRoot from "@shared/domain/aggregate/AggregateRoot";
import { Primitives } from "@utils/helper/Primitives";
import QuoteId from "./QuoteId";
import QuoteCreatedAt from "./QuoteCreatedAt";
import QuoteExpiresAt from "./QuoteExpiresAt";
import QuoteProposals from "./QuoteProposals";
import QuoteStatus from "./QuoteStatus";
import QuoteType from "../quote_type/QuoteType";

export default abstract class Quote extends AggregateRoot {

  readonly id: QuoteId;

  readonly type: QuoteType;

  readonly proposals: QuoteProposals;

  readonly createdAt: QuoteCreatedAt;

  readonly expiresAt: QuoteExpiresAt;

  readonly status: QuoteStatus;

  constructor ( props: QuoteProps ) {
    super();
    this.id = props.id;
    this.proposals = props.proposals;
    this.createdAt = props.createdAt;
    this.expiresAt = props.expiresAt;
    this.status = props.status;
    this.type = props.type;
  }

  toPrimitive (): Primitives<Quote> {
    return {
      id: this.id.valueOf(),
      type: this.type.toPrimitive(),
      proposals: this.proposals.toPrimitive(),
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
      status: this.status.valueOf()
    };
  }
}

export type QuoteProps = {
    id: QuoteId;
    type: QuoteType;
    proposals: QuoteProposals;
    createdAt: QuoteCreatedAt;
    expiresAt: QuoteExpiresAt;
    status: QuoteStatus;
};