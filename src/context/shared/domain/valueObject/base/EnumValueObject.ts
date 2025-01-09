export default abstract class EnumValueObject<T> {
  readonly value: T;

  constructor ( value: T, public readonly validValues: T[]) {
    this.value = value;
    this.checkValueIsValid( value );
  }

  public checkValueIsValid ( value: T ): void {
    if ( !this.validValues.includes( value )) {
      this.throwErrorForInvalidValue();
    }
  }

  public includes ( values: T|T[]): boolean {
    if ( !Array.isArray( values )) {
      return this.value === values;
    }

    return values.some( value => this.value === value );
  }

  protected abstract throwErrorForInvalidValue(): void;
}
