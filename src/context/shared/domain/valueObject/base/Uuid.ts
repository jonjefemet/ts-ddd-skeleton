import { v4 as uuid, validate } from "uuid";
import ValueObjectError from "../../error/ValueObjectError";
import SharedExceptions from "../../SharedExceptions";
import StringValueObject from "./StringValueObject";

export class Uuid extends StringValueObject {
  constructor ( value: string ) {
    super( value );
    this.ensureIsValidUuid( value );
  }

  static random (): Uuid {
    return new Uuid( uuid());
  }

  private ensureIsValidUuid ( uuid: string ): void {
    if ( !validate( uuid )) throw new ValueObjectError( SharedExceptions.INVALID_UUID );
  }
}
