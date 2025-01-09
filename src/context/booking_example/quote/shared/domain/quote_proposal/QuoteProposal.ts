import { Uuid } from "@shared/domain/valueObject/common/Uuid";
import QuoteProposalType from "./QuoteProposalType";
import { Primitives } from "@utils/helper/Primitives";

export default abstract class QuoteProposal {

  readonly id: Uuid;

  readonly isApproved: boolean;

  readonly type: QuoteProposalType;

  abstract toPrimitive (): Primitives<unknown>;
}

export type QuoteProposalProps = {
    id: Uuid;
    isApproved: boolean;
    type: QuoteProposalType;
};