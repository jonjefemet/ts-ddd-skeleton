import { EnumValueObject } from "@shared/domain/valueObject/common/EnumValueObject";
import InvalidPokemonTypeException from "./exceptions/InvalidPokemonTypeException";

export enum PokemonTypeEnum {
    "NORMAL" = "NORMAL",
    "FIRE" = "FIRE",
    "WATER" = "WATER",
    "PlANT" = "PlANT",
}

export default class PokemonType extends EnumValueObject<PokemonTypeEnum> {
  protected throwErrorForInvalidValue (): void {
    throw new InvalidPokemonTypeException( this.valueOf());
  }

  public static create ( value: PokemonTypeEnum ): PokemonType {
    return new PokemonType( value, Object.values( PokemonTypeEnum ));
  }

  static fromValue ( value: string ): PokemonType {
    const pokemonType = Object.values( PokemonTypeEnum ).find(( type ) => type === value ) ;

    return new PokemonType( pokemonType || "" as PokemonTypeEnum, Object.values( PokemonTypeEnum ));
  }

}