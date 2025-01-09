import StringValueObject from "../valueObject/base/StringValueObject";

export default class FilterValue extends StringValueObject {
  constructor ( value: string ) {
    super( value );
  }
}
