import { v4 as uuid, validate } from "uuid";
import { StringValueObject } from "./StringValueObject";
import ValueObjectError from "@shared/domain/error/ValueObjectError";

export class Uuid extends StringValueObject {
  constructor ( value: string ) {
    super( value );
    this.ensureIsValidUuid( value );
  }

  static random (): Uuid {
    return new Uuid( uuid());
  }

  private ensureIsValidUuid ( uuid: string ): void {
    if ( !validate( uuid )) throw new UuidInvalidException();
  }
}

export class UuidInvalidException extends ValueObjectError {

  constructor () {
    super({
      code: "UUID_INVALID",
      message: "The uuid is invalid"
    });
  }
}