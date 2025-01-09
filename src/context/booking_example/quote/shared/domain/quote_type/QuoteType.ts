import { Primitives } from "@utils/helper/Primitives";
import QuoteTypeCategory from "./QuoteTypeCategory";

export default abstract class QuoteType {

  constructor ( props: QuoteTypeProps ) {
    this.category = props.category;
  }

  readonly category: QuoteTypeCategory;

  abstract toPrimitive(): Primitives<QuoteType>;
}

export type QuoteTypeProps = {
    category: QuoteTypeCategory;
};