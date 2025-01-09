import BattlePokemon from "@context/pokemon_example/battle/pokemon/domain/BattlePokemon";
import BattlePokemonRepository from "@context/pokemon_example/battle/pokemon/domain/BattlePokemonRepository";
import PokemonId from "@context/pokemon_example/pokemon/pokemon/domain/PokemonId";

export class MockBattleBattlePokemonRepository implements BattlePokemonRepository {
  private searchResults: Map<PokemonId, BattlePokemon> = new Map();

  private mockSearch = jest.fn();

  setSearchResults ( results: BattlePokemon[]): void {
    this.searchResults = new Map(
      results.map(( result ) => [
        result.id, result
      ])
    );
  }

  async search ( id: PokemonId ): Promise<BattlePokemon> {
    this.mockSearch( id );

    return this.searchResults.get( id );
  }
}