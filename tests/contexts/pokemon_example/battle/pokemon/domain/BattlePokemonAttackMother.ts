import BattlePokemonAttack from "@context/pokemon_example/battle/pokemon/domain/BattlePokemonAttack";
import { randomIntNumber } from "@utils/helper/Random";

export default class BattlePokemonAttackMother {
  static create ( value: number ): BattlePokemonAttack {
    return new BattlePokemonAttack( value );
  }

  static random (): BattlePokemonAttack {
    return BattlePokemonAttackMother.create( randomIntNumber({
      min: 50,
      max: 100
    }));
  }

}