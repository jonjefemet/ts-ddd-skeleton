import Operator from "@utils/constant/Operator.enum";
import EnumValueObject from "../valueObject/base/EnumValueObject";

export default class FilterOperator extends EnumValueObject<Operator> {
  constructor ( value: Operator ) {
    super( value, Object.values( Operator ));
  }

  static fromValue ( value: string ): FilterOperator {
    for ( const operatorValue of Object.values( Operator )) {
      if ( value === operatorValue.toString()) {
        return new FilterOperator( operatorValue );
      }
    }

    throw new Error( `The filter operator ${value} is invalid` );
  }

  public isPositive (): boolean {
    return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
  }

  protected throwErrorForInvalidValue ( value: Operator ): void {
    throw new Error( `The filter operator ${value} is invalid` );
  }

  static equal () {
    return this.fromValue( Operator.EQUAL );
  }
}
