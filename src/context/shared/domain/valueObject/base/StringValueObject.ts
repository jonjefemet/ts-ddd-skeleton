import SharedExceptions from "../../SharedExceptions";
import ValueObjectError from "../../error/ValueObjectError";
import ValueObject from "../ValueObject";

/* El código define una clase abstracta llamada "StringValueObject" que extiende otra clase llamada
"ValueObject". */
export default abstract class StringValueObject extends String implements ValueObject<string> {

  constructor ( readonly value: string ) {
    super( value );
  }

  /*
 * La función garantiza que un valor de cadena no esté vacío.
 */
  protected ensureIsNotEmptyString (): void {
    if ( this.value.length === 0 ) throw new ValueObjectError( SharedExceptions.EMPTY_VALUE );
  }
}
