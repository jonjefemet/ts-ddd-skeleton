import PokedexPokemonDescription from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemonDescription";
import { faker } from "@faker-js/faker";

export default class PokedexPokemonDescriptionMother {

  static random (): PokedexPokemonDescription {
    return PokedexPokemonDescriptionMother.create( faker.lorem.sentence());
  }

  static create ( value: string ): PokedexPokemonDescription {
    return new PokedexPokemonDescription( value );
  }
}