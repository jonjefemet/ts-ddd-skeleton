import StringValueObject from "../valueObject/base/StringValueObject";

export default class OrderBy extends StringValueObject {
  constructor ( value: string ) {
    super( value );
  }
}
