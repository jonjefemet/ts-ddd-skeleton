import SearchPokedexPokemonQuery from "@context/pokemon_example/pokedex/pokemon/application/search/SearchPokedexPokemonQuery";

export default class SearchPokedexPokemonQueryMother {

  static create ( pokemonId: string ): SearchPokedexPokemonQuery {
    return new SearchPokedexPokemonQuery({
      pokemonId
    });
  }
}