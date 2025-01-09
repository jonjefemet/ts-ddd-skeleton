import { Pokemon } from "./Pokemon";
import PokemonId from "./PokemonId";

export default interface PokemonSearcherRepository<T extends Pokemon> {
    search: ( id: PokemonId ) => Promise<T | null>;
}