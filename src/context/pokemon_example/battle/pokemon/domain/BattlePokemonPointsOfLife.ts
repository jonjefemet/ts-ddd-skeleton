import { NumberValueObject } from "@shared/domain/valueObject/common/NumberValueObject";

export default class BattlePokemonPointsOfLife extends NumberValueObject {

  isAlive (): boolean {
    return this.valueOf() > 0;
  }
}