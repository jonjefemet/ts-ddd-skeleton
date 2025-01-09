import BattlePokemon from "@context/pokemon_example/battle/pokemon/domain/BattlePokemon";
import BattlePokemonRepository from "@context/pokemon_example/battle/pokemon/domain/BattlePokemonRepository";
import PokemonId from "@context/pokemon_example/pokemon/pokemon/domain/PokemonId";

export default class MockBattlePokemonRepository implements BattlePokemonRepository {

  private mockSearch = jest.fn();

  async search ( id: PokemonId ): Promise<BattlePokemon> {
    return this.mockSearch( id );
  }

  returnOnSearch ( battlePokemon: BattlePokemon ): void {

    this.mockSearch.mockReturnValue( battlePokemon );
  }

}