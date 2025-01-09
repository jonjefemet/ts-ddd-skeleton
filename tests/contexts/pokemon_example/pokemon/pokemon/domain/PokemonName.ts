import PokemonName from "@context/pokemon_example/pokemon/pokemon/domain/PokemonName";
import { faker } from "@faker-js/faker";

export default class PokemonNameMother {

  static random (): PokemonName {
    return PokemonNameMother.create( faker.animal.type());
  }

  static create ( value: string ): PokemonName {
    return new PokemonName( value );
  }
}