import { Primitives } from "@utils/helper/Primitives";
import QuoteTypeAgencyCategory from "./QuoteTypeAgencyCategory";
import QuoteType, { QuoteTypeProps } from "../../../shared/domain/quote_type/QuoteType";
import QuoteTypeAgencyAuthor from "./author/QuoteTypeAgencyAuthor";

export default class QuoteTypeAgency extends QuoteType {

  public readonly author: QuoteTypeAgencyAuthor;

  declare readonly category: QuoteTypeAgencyCategory;

  constructor ( props: QuoteTypeAgencyProps ) {
    super({
      category: props.category
    });
    this.author = props.author;
  }

  toPrimitive (): Primitives<QuoteTypeAgency> {
    return {
      category: this.category.valueOf(),
      author: this.author.toPrimitive()
    };
  }

  static create ( props: QuoteTypeAgencyProps ): QuoteTypeAgency {
    return new QuoteTypeAgency({
      ...props
    });
  }

}

export type QuoteTypeAgencyProps = {
    category: QuoteTypeAgencyCategory;
    author: QuoteTypeAgencyAuthor;
} & QuoteTypeProps;