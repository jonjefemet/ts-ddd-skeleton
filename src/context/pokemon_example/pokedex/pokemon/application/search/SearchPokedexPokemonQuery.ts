import { Query } from "@shared/domain/bus/query/Query";

export default class SearchPokedexPokemonQuery extends Query {

  readonly pokemonId: string;

  constructor (
    props: SearchPokedexPokemonQueryProps
  ) {
    super();
    this.pokemonId = props.pokemonId;
  }

}

type SearchPokedexPokemonQueryProps = {
  pokemonId: string;
};