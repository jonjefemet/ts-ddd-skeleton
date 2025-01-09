import { Primitives } from "@utils/helper/Primitives";
import QuoteTypeAgencyAuthorId from "./QuoteTypeAgencyAuthorId";
import QuoteTypeAgencyAuthorEmail from "./QuoteTypeAgencyAuthorEmail";
import QuoteTypeAgencyAuthorName from "./QuoteTypeAgencyAuthorName";

export default class QuoteTypeAgencyAuthor {

  public readonly id: QuoteTypeAgencyAuthorId;

  public readonly email: QuoteTypeAgencyAuthorEmail;

  public readonly name: QuoteTypeAgencyAuthorName;

  constructor ( props: QuoteTypeAgencyAuthorProps ) {
    this.id = props.authorId;
    this.email = props.email;
    this.name = props.name;
  }

  toPrimitive (): Primitives<QuoteTypeAgencyAuthor> {
    return {
      id: this.id.valueOf(),
      email: this.email.valueOf(),
      name: this.name.valueOf()
    };
  }

  static create ( props: QuoteTypeAgencyAuthorProps ): QuoteTypeAgencyAuthor {
    return new QuoteTypeAgencyAuthor({
      ...props
    });
  }
}

export type QuoteTypeAgencyAuthorProps = {
    authorId: QuoteTypeAgencyAuthorId;
    email: QuoteTypeAgencyAuthorEmail;
    name: QuoteTypeAgencyAuthorName;
    metadata?: Readonly<Record<string, unknown>>;
};