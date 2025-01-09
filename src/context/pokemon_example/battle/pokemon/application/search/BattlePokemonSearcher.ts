import PokemonId from "@context/pokemon_example/pokemon/pokemon/domain/PokemonId";
import BattlePokemon from "../../domain/BattlePokemon";
import BattlePokemonRepository from "../../domain/BattlePokemonRepository";

export default class BattlePokemonSearcher {
  constructor ( private readonly battlePokemonRepository: BattlePokemonRepository ) {}

  async search ( id: PokemonId ): Promise<BattlePokemon> {

    const battlePokemon = await this.battlePokemonRepository.search( id );

    return battlePokemon;
  }
}