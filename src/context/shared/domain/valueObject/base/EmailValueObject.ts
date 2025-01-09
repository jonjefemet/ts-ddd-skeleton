import SharedExceptions from "../../SharedExceptions";
import ValueObjectError from "../../error/ValueObjectError";
import StringValueObject from "./StringValueObject";

export abstract class EmailValueObject extends StringValueObject {

  constructor ( value: string ) {
    super( value );
    this.ensureIsValidEmail();
  }

  protected ensureIsValidEmail (): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ( !emailRegex.test( this.value )) throw new ValueObjectError( SharedExceptions.INVALID_EMAIL );
  }
}
