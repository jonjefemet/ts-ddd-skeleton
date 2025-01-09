import { Pokemon } from "./Pokemon";

export default interface PokemonCreatorRepository<T extends Pokemon> {
    save: ( pokemon: T ) => Promise<void>;
}