import ValueObjectError from "@shared/domain/error/ValueObjectError";
import { ValueObject } from "./ValueObject";

export abstract class NumberValueObject extends Number implements ValueObject {

  constructor ( value: number ) {
    super( value );
    this.ensureValueIsDefined( value );
  }

  private ensureValueIsDefined ( value: number ): void {
    if ( value === null || value === undefined ) throw new NumberValueObjectUndefinedException();
  }

}

export class NumberValueObjectUndefinedException extends ValueObjectError {

  constructor () {
    super({
      code: "DECIMAL_VALUE_OBJECT_UNDEFINED",
      message: "The decimal value object is undefined"
    });
  }

}
