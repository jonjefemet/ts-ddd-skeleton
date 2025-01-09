import { Collection } from "@shared/domain/valueObject/common/Collection";
import PokemonType from "./PokemonType";
import PokemonTypesCannotBeRepeatedExeption from "./exceptions/PokemonTypesCannotBeRepeatedExeption";

export default class PokemonTypes extends Collection<PokemonType> {
  toPrimitive () {
    return this.map( item => item.valueOf());
  }

  constructor ( ...types: PokemonType[]) {
    super( ...types );
    this.ensureDontHaveRepeatedTypes( ...types );
  }

  private ensureDontHaveRepeatedTypes ( ...types: PokemonType[]): void {
    const uniqueTypes = new Set( types.map( item => item.valueOf()));

    if ( uniqueTypes.size !== types.length ) {
      throw new PokemonTypesCannotBeRepeatedExeption();
    }
  }
}