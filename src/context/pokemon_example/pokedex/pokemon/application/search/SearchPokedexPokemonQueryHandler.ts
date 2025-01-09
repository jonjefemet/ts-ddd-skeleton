import { QueryHandler } from "@shared/domain/bus/query/QueryHandler";
import SearchPokedexPokemonQuery from "./SearchPokedexPokemonQuery";
import { Query } from "@shared/domain/bus/query/Query";
import PokedexPokemonSearcher from "./PokedexPokemonSearcher";
import Log from "@utils/decorators/Log";
import PokedexPokemonResponse from "../PokedexPokemonResponse";
import PokemonId from "@context/pokemon_example/pokemon/pokemon/domain/PokemonId";

export default class SearchPokedexPokemonQueryHandler implements QueryHandler<SearchPokedexPokemonQuery, PokedexPokemonResponse> {
  constructor ( private pokedexPokemonSearcher: PokedexPokemonSearcher ) {}

  subscribedTo (): Query {
    return SearchPokedexPokemonQuery;
  }

  @Log()
  async handle ( query: SearchPokedexPokemonQuery ): Promise<PokedexPokemonResponse> {

    const pokedexPokemon = await this.pokedexPokemonSearcher.search({ pokemonId: new PokemonId( query.pokemonId ) });

    if ( !pokedexPokemon ) {
      return null;
    }

    return PokedexPokemonResponse.create( pokedexPokemon.toPrimitive());
  }

}