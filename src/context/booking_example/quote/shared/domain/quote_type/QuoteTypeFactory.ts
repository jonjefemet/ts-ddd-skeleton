import QuoteTypeAgency, { QuoteTypeAgencyProps } from "@context/booking_example/quote/quote_types/agency/domain/QuoteTypeAgency";
import QuoteTypeCategory, { QuoteTypeCategoryEnum } from "./QuoteTypeCategory";
import QuoteType, { QuoteTypeProps } from "./QuoteType";
import { Primitives } from "@utils/helper/Primitives";
import QuoteTypeAgencyCategory from "@context/booking_example/quote/quote_types/agency/domain/QuoteTypeAgencyCategory";
import QuoteTypeAgencyAuthor from "@context/booking_example/quote/quote_types/agency/domain/author/QuoteTypeAgencyAuthor";
import QuoteTypeAgencyAuthorId from "@context/booking_example/quote/quote_types/agency/domain/author/QuoteTypeAgencyAuthorId";
import QuoteTypeAgencyAuthorEmail from "@context/booking_example/quote/quote_types/agency/domain/author/QuoteTypeAgencyAuthorEmail";
import QuoteTypeAgencyAuthorName from "@context/booking_example/quote/quote_types/agency/domain/author/QuoteTypeAgencyAuthorName";

export default class QuoteTypeFactory {

  static readonly types = new Map<QuoteTypeCategoryEnum, ( props: QuoteTypeProps ) => QuoteType>([
    [
      QuoteTypeCategoryEnum.AGENCY, QuoteTypeAgency.create
    ],
    [
      QuoteTypeCategoryEnum.STANDARD, QuoteTypeAgency.create
    ]
  ]);

  static createFromPrimitive ( props: Primitives<QuoteType> ): QuoteType {

    const quoteProps = QuoteTypeFactory.buildProps( props );

    const type = QuoteTypeFactory.types.get( quoteProps.category.valueOf() as QuoteTypeCategoryEnum );

    if ( !type ) {
      throw new Error( `Invalid quote type category: ${ props.category.valueOf() }` );
    }

    return type( quoteProps );
  }

  static buildProps ( props: Primitives<QuoteType> ): QuoteTypeProps {
    const category = new QuoteTypeCategory( props.category as QuoteTypeCategoryEnum );

    if ( category.valueOf() === QuoteTypeCategoryEnum.AGENCY ) {
      return QuoteTypeFactory.buildPropsForQuoteTypeAgency( props );
    }
  }

  private static buildPropsForQuoteTypeAgency ( props: Partial<Primitives<QuoteTypeAgency>> ): QuoteTypeAgencyProps {
    return {
      category: QuoteTypeAgencyCategory.fromValue( props.category ),
      author: QuoteTypeAgencyAuthor.create({
        authorId: new QuoteTypeAgencyAuthorId( props.author.id ),
        email: new QuoteTypeAgencyAuthorEmail( props.author.email ),
        name: new QuoteTypeAgencyAuthorName( props.author.name )
      })
    };
  }

}
