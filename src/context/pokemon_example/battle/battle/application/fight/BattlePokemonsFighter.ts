import BattlePokemonSearcher from "@context/pokemon_example/battle/pokemon/application/search/BattlePokemonSearcher";
import PokemonBattleMatchService from "../../domain/PokemonBattleMatchService";
import PokemonId from "@context/pokemon_example/pokemon/pokemon/domain/PokemonId";

export default class BattlePokemonsFighter {

  constructor (
    private readonly battlePokemonSearcher: BattlePokemonSearcher
  ) {}

  async fight ( localPokemonId: PokemonId, remotePokemonId: PokemonId ) {

    const localPokemon = await this.battlePokemonSearcher.search( localPokemonId );
    const remotePokemon = await this.battlePokemonSearcher.search( remotePokemonId );

    const pokemonBattleMatchService = PokemonBattleMatchService.create( localPokemon, remotePokemon );

    pokemonBattleMatchService.start();

  }
}