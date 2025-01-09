import PokedexPokemonNumberPokedex from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemonNumberPokedex";
import { randomIntNumber } from "@utils/helper/Random";

export default class PokedexPokemonNumberPokedexMother {

  static random (): PokedexPokemonNumberPokedex {
    return PokedexPokemonNumberPokedexMother.create( randomIntNumber({
      min: 1,
      max: 100
    }));
  }

  static create ( value: number ): PokedexPokemonNumberPokedex {
    return new PokedexPokemonNumberPokedex( value );
  }
}
