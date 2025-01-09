import Logger from "@utils/log/Logger";
import BattlePokemon from "../../pokemon/domain/BattlePokemon";

export default class PokemonBattleMatchService {

  readonly localPokemon: BattlePokemon;

  readonly remotePokemon: BattlePokemon;

  constructor ( localPokemon: BattlePokemon, remotePokemon: BattlePokemon ) {
    this.localPokemon = localPokemon;
    this.remotePokemon = remotePokemon;
  }

  public start (): void {
    Logger.info( `Starting battle between ${this.localPokemon.name} and ${this.remotePokemon.name}` );
    Logger.info( `${this.localPokemon.name} has ${this.localPokemon.hp()} HP` );
    Logger.info( `${this.remotePokemon.name} has ${this.remotePokemon.hp()} HP` );

    while ( this.localPokemon.isAlive() && this.remotePokemon.isAlive()) {
      Logger.info( `${this.localPokemon.name} attacks ${this.remotePokemon.name}` );
      this.localPokemon.attackFor( this.remotePokemon );
      Logger.info( `${this.remotePokemon.name} attacks ${this.localPokemon.name}` );
      this.remotePokemon.attackFor( this.localPokemon );
      Logger.info( `${this.localPokemon.name} has ${this.localPokemon.hp()} HP` );
      Logger.info( `${this.remotePokemon.name} has ${this.remotePokemon.hp()} HP` );
    }

    Logger.info( `Battle between ${this.localPokemon.name} and ${this.remotePokemon.name} has ended` );

    if ( this.localPokemon.isAlive()) {
      Logger.info( `${this.localPokemon.name} has won` );
    } else {
      Logger.info( `${this.remotePokemon.name} has won` );
    }
  }

  static create ( localPokemon: BattlePokemon, remotePokemon: BattlePokemon ): PokemonBattleMatchService {
    return new PokemonBattleMatchService( localPokemon, remotePokemon );
  }
}