import { NumberValueObject } from "@shared/domain/valueObject/common/NumberValueObject";
import PokedexPokemonInvalidWeightException from "./exceptions/PokedexPokemonInvalidWeightException";

export default class PokedexPokemonWeight extends NumberValueObject {

  constructor ( value: number ) {
    super( value );
    this.ensureIsValidWeight( value );
  }

  private ensureIsValidWeight ( value: number ): void {
    if ( value < 0 ) {
      throw new PokedexPokemonInvalidWeightException( value );
    }
  }
}