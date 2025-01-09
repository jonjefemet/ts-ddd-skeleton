import { Uuid } from "@shared/domain/valueObject/common/Uuid";

export default class PokemonId extends Uuid {
  constructor ( value: string ) {
    super( value );
  }
}