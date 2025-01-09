import PokemonSearcherRepository from "@context/pokemon_example/pokemon/pokemon/domainPokemonSearcherRepository";
import BattlePokemon from "./BattlePokemon";
import PokemonId from "@context/pokemon_example/pokemon/pokemon/domainPokemonId";

export default class BattlePokemonRepository implements PokemonSearcherRepository<BattlePokemon> {
  search: ( id: PokemonId ) => Promise<BattlePokemon>;
}