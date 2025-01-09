import BattlePokemonPointsOfLife from "@context/pokemon_example/battle/pokemon/domain/BattlePokemonPointsOfLife";
import { randomIntNumber } from "@utils/helper/Random";

export default class BattlePokemonPointsOfLifeMother {

  static create ( value: number ): BattlePokemonPointsOfLife {
    return new BattlePokemonPointsOfLife( value );
  }

  static random (): BattlePokemonPointsOfLife {
    return BattlePokemonPointsOfLifeMother.create( randomIntNumber({
      min: 50,
      max: 100
    }));
  }

}
