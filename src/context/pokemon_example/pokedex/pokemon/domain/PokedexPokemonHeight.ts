import { NumberValueObject } from "@shared/domain/valueObject/common/NumberValueObject";
import PokedexPokemonInvalidHeightException from "./exceptions/PokedexPokemonInvalidHeightException";

export default class PokedexPokemonHeight extends NumberValueObject {

  constructor ( value: number ) {
    super( value );
    this.ensureIsValidHeight( value );
  }

  private ensureIsValidHeight ( value: number ): void {
    if ( value < 0 ) {
      throw new PokedexPokemonInvalidHeightException( value );
    }
  }
}