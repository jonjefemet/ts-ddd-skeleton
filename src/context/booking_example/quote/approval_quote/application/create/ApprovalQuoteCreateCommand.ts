import { Command } from "@shared/domain/bus/command/Command";

export default class ApprovalQuoteCreateCommand extends Command {

  readonly id: string;

  constructor ( props: ApprovalQuoteCommandProps ) {
    super();
    this.id = props.id;
  }

}

type ApprovalQuoteCommandProps = {
    id: string;
};