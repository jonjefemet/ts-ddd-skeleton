import ValueObjectError from "@shared/domain/error/ValueObjectError";
import { ValueObject } from "./ValueObject";

export abstract class BooleanValueObject extends Boolean implements ValueObject {

  constructor ( value: boolean ) {
    super( value );
    this.ensureValueIsDefined( value );
  }

  private ensureValueIsDefined ( value: boolean ): void {
    if ( value === null || value === undefined ) throw new BooleanObjectUndefinedException();
  }

}

class BooleanObjectUndefinedException extends ValueObjectError {

  constructor () {
    super({
      code: "BOOLEAN_VALUE_OBJECT_UNDEFINED",
      message: "The boolean value object is undefined"
    });
  }

}
