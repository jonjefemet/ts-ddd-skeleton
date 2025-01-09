import ValueObjectError from "@shared/domain/error/ValueObjectError";
import { StringValueObject } from "./StringValueObject";

export default class EmailValueObject extends StringValueObject {

  constructor ( value: string ) {
    super( value );
    this.ensureIsValidEmail();
  }

  private ensureIsValidEmail (): void {
    if ( !this.isValidEmail( this.valueOf())) {
      throw new EmailValueObjectIsInvalidException();
    }
  }

  private isValidEmail ( email: string ): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test( email );
  }
}

export class EmailValueObjectIsInvalidException extends ValueObjectError {

  constructor () {
    super({
      code: "EMAIL_VALUE_OBJECT_IS_INVALID",
      message: "The email value object is invalid"
    });
  }

}
