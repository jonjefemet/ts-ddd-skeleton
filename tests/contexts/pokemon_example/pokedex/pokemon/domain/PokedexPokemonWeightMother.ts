import PokedexPokemonWeight from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemonWeight";
import { randomIntNumber } from "@utils/helper/Random";

export default class PokedexPokemonWeightMother {

  static random (): PokedexPokemonWeight {
    return PokedexPokemonWeightMother.create( randomIntNumber({
      min: 50,
      max: 100
    }));
  }

  static create ( value: number ): PokedexPokemonWeight {
    return new PokedexPokemonWeight( value );
  }
}