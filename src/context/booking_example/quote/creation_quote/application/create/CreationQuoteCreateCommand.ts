import QuoteProposal from "@context/booking_example/quote/shared/domain/quote_proposal/QuoteProposal";
import QuoteType from "@context/booking_example/quote/shared/domain/quote_type/QuoteType";
import { Command } from "@shared/domain/bus/command/Command";
import { Primitives } from "@utils/helper/Primitives";

export default class CreationQuoteCreateCommand extends Command {

  readonly id: string;

  readonly type: Primitives<QuoteType>;

  readonly proposals: ProposalCreateCommandProps[];

  readonly createdAt: Date;

  readonly expiresAt: Date;

  constructor ( props: CreatonQuoteCreateCommandProps ) {
    super();
    this.id = props.id;
    this.proposals = props.proposals;
    this.createdAt = props.createdAt;
    this.expiresAt = props.expiresAt;
  }

}

export type CreatonQuoteCreateCommandProps = {
    id: string;
    type: Primitives<QuoteType>;
    proposals: ProposalCreateCommandProps[];
    createdAt: Date;
    expiresAt: Date;
};

type ProposalCreateCommandProps = Pick<Primitives<QuoteProposal>, "type" | "id">;
