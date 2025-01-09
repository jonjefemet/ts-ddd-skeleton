import Criteria from "@shared/domain/criteria/Criteria";
import { Pokemon } from "./Pokemon";

export default interface PokemonCriteriaSearcherRepository<T extends Pokemon> {
    matching: ( criteria: Criteria ) => Promise<T[]>;
}
