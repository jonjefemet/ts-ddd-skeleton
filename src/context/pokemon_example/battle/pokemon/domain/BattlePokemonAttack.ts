import { NumberValueObject } from "@shared/domain/valueObject/common/NumberValueObject";
import BattlePokemonDefense from "./BattlePokemonDefense";

export default class BattlePokemonAttack extends NumberValueObject {

  calculateDamage ( defense: BattlePokemonDefense ): number {
    const defensePercentage = defense.valueOf() / 100;
    const damage = this.valueOf() * ( 1 - defensePercentage );

    return Math.round( damage );
  }
}