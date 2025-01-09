import PokedexPokemonHeight from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemonHeight";
import { randomIntNumber } from "@utils/helper/Random";

export default class PokedexPokemonHeightMother {

  static random (): PokedexPokemonHeight {
    return PokedexPokemonHeightMother.create( randomIntNumber({
      min: 50,
      max: 100
    }));
  }

  static create ( value: number ): PokedexPokemonHeight {
    return new PokedexPokemonHeight( value );
  }
}