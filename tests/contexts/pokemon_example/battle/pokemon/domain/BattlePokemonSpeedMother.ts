import BattlePokemonSpeed from "@context/pokemon_example/battle/pokemon/domain/BattlePokemonSpeed";
import { randomIntNumber } from "@utils/helper/Random";

export default class BattlePokemonSpeedMother {

  static random (): BattlePokemonSpeed {
    return BattlePokemonSpeedMother.create( randomIntNumber({
      min: 50,
      max: 100
    }));
  }

  static create ( value: number ): BattlePokemonSpeed {
    return new BattlePokemonSpeed( value );
  }
}