import ValueObject from "../ValueObject";

export default class DateValueObject extends Date implements ValueObject<Date> {

  constructor ( readonly value: Date ) {
    super( value );
  }

  toString (): string {
    return this.value.toLocaleDateString();
  }
}