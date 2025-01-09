import SharedExceptions from "../../SharedExceptions";
import ValueObjectError from "../../error/ValueObjectError";
import ValueObject from "../ValueObject";

export default abstract class NumberValueObject extends Number implements ValueObject<number> {

  constructor ( readonly value: number ) {
    super( value );
    this.ensureValidNumber( value );
  }

  /**
   * La función garantiza que el valor dado sea un número válido y arroja un error si no lo es.
   * @param {number} value - El parámetro "valor" es de tipo número.
   */
  private ensureValidNumber ( value: number ): void {
    const isNumeric = !Number.isNaN( value ) && typeof value === "number";

    if ( !isNumeric ) throw new ValueObjectError( SharedExceptions.INVALID_VALUE );
  }

  toString (): string {
    return this.value.toString();
  }

}
