import ValueObjectError from "@shared/domain/error/ValueObjectError";
import { ValueObject } from "./ValueObject";

export abstract class StringValueObject extends String implements ValueObject {

  constructor ( value: string ) {
    super( value );
    this.ensureValueIsDefined( value );
  }

  private ensureValueIsDefined ( value: string ): void {
    if ( value === null || value === undefined ) throw new StringValueObjectUndefinedException();
  }

}

export class StringValueObjectUndefinedException extends ValueObjectError {

  constructor () {
    super({
      code: "STRING_VALUE_OBJECT_UNDEFINED",
      message: "The string value object is undefined"
    });
  }

}
