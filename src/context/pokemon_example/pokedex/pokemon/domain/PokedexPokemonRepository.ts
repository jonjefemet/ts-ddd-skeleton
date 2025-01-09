import PokemonSearcherRepository from "@context/pokemon_example/pokemon/pokemon/domain/PokemonSearcherRepository";
import { PokedexPokemon } from "./PokedexPokemon";
import PokemonCriteriaSearcherRepository from "@context/pokemon_example/pokemon/pokemon/domain/PokemonCriteriaSearcherRepository";
import PokemonCreatorRepository from "@context/pokemon_example/pokemon/pokemon/domain/PokemonCreatorRepository";

export default interface PokedexPokemonRepository extends
PokemonSearcherRepository<PokedexPokemon>,
PokemonCriteriaSearcherRepository<PokedexPokemon>,
PokemonCreatorRepository<PokedexPokemon> { }