import { StringValueObject } from "./StringValueObject";

export abstract class EnumValueObject<T extends string> extends StringValueObject {

  constructor ( value: T, public readonly validValues: T[]) {
    super( value );
    this.checkValueIsValid( value );
  }

  public checkValueIsValid ( value: T ): void {
    if ( !this.validValues.includes( value )) {
      this.throwErrorForInvalidValue();
    }
  }

  public contains ( values: T|T[]): boolean {
    if ( !Array.isArray( values )) {
      return this.toString() === values;
    }

    return values.some( value => this.toString() === value );
  }

  protected abstract throwErrorForInvalidValue(): void;
}
