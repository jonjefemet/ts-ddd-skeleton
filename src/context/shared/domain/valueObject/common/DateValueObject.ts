import ValueObjectError from "@shared/domain/error/ValueObjectError";
import { ValueObject } from "./ValueObject";

export abstract class DateValueObject extends Date implements ValueObject {

  constructor ( value: Date ) {
    super( value );
    this.ensureValueIsDefined( value );
  }

  private ensureValueIsDefined ( value: Date ): void {
    if ( value === null || value === undefined ) throw new DateValueObjectUndefinedException();
  }

}

class DateValueObjectUndefinedException extends ValueObjectError {

  constructor () {
    super({
      code: "DATE_VALUE_OBJECT_UNDEFINED",
      message: "The date value object is undefined"
    });
  }

}
