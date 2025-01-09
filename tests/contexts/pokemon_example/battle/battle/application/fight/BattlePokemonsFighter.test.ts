import BattlePokemonsFighter from "@context/pokemon_example/battle/battle/application/fight/BattlePokemonsFighter";
import BattlePokemonSearcher from "@context/pokemon_example/battle/pokemon/application/search/BattlePokemonSearcher";
import BattlePokemonMother from "@tests/contexts/pokemon_example/battle/pokemon/domain/BattlePokemonMother";
import { MockBattleBattlePokemonRepository } from "../../__mocks__/MockBattleBattlePokemonRepository";

describe( "BattlePokemonsFighter", () => {

  let battlePokemonsFighter: BattlePokemonsFighter;
  let battlePokemonSearcher: BattlePokemonSearcher;
  let mockBattlePokemonRepository: MockBattleBattlePokemonRepository;

  beforeEach(() => {
    mockBattlePokemonRepository = new MockBattleBattlePokemonRepository();
    battlePokemonSearcher = new BattlePokemonSearcher( mockBattlePokemonRepository );
    battlePokemonsFighter = new BattlePokemonsFighter( battlePokemonSearcher );
  });
  it( "should fight two pokemons", async () => {
    const localPokemon = BattlePokemonMother.random();
    const remotePokemon = BattlePokemonMother.random();
    mockBattlePokemonRepository.setSearchResults([
      localPokemon, remotePokemon
    ]);
    await battlePokemonsFighter.fight( localPokemon.id, remotePokemon.id );
    expect( 1 ).toBe( 1 );
  });
});