import { Collection } from "@shared/domain/valueObject/common/Collection";
import QuoteProposalBooking from "../../../quote_proposals/booking/domain/QuoteProposalBooking";

export default class QuoteProposals extends Collection<ProposalsTypes> {
  toPrimitive () {
    return this.map( item => item.toPrimitive());
  }
}

export type ProposalsTypes = QuoteProposalBooking;
