import PokedexPokemonResponse from "@context/pokemon_example/pokedex/pokemon/application/PokedexPokemonResponse";
import { PokedexPokemon } from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemon";

export default class PokedexPokemonResponseMother {

  static create ( pokedexPokemon: PokedexPokemon ): PokedexPokemonResponse {
    return PokedexPokemonResponse.create( pokedexPokemon.toPrimitive());
  }
}