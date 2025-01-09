import BattlePokemonDefense from "@context/pokemon_example/battle/pokemon/domain/BattlePokemonDefense";
import { randomIntNumber } from "@utils/helper/Random";

export default class BattlePokemonDefenseMother {

  static random (): BattlePokemonDefense {
    return BattlePokemonDefenseMother.create( randomIntNumber({
      max: 100,
      min: 50
    }));
  }

  static create ( value: number ): BattlePokemonDefense {
    return new BattlePokemonDefense( value );
  }
}