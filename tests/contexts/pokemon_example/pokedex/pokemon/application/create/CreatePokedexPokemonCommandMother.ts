import PokemonIdMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonIdMother";
import PokemonNameMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonName";
import PokemonTypesMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonTypesMother";
import PokedexPokemonNumberPokedexMother from "../../domain/PokedexPokemonNumberPokedexMother";
import PokedexPokemonDescriptionMother from "../../domain/PokedexPokemonDescriptionMother";
import PokedexPokemonHeightMother from "../../domain/PokedexPokemonHeightMother";
import PokedexPokemonWeightMother from "../../domain/PokedexPokemonWeightMother";
import CreatePokedexPokemonCommand, { CreatePokedexPokemonCommandProps } from "@context/pokemon_example/pokedex/pokemon/application/create/CreatePokedexPokemonCommand";

export default class CreatePokedexPokemonCommandMother {

  static create ( props: CreatePokedexPokemonCommandProps ): CreatePokedexPokemonCommand {
    return new CreatePokedexPokemonCommand( props );
  }

  static random (): CreatePokedexPokemonCommand {
    return this.create({
      id: PokemonIdMother.random().valueOf(),
      name: PokemonNameMother.random().valueOf(),
      types: PokemonTypesMother.random().toPrimitive(),
      numberPokedex: PokedexPokemonNumberPokedexMother.random().valueOf(),
      description: PokedexPokemonDescriptionMother.random().valueOf(),
      height: PokedexPokemonHeightMother.random().valueOf(),
      weight: PokedexPokemonWeightMother.random().valueOf()
    });
  }

  static invalidWeight (): CreatePokedexPokemonCommand {
    return this.create({
      id: PokemonIdMother.random().valueOf(),
      name: PokemonNameMother.random().valueOf(),
      types: PokemonTypesMother.random().toPrimitive(),
      numberPokedex: PokedexPokemonNumberPokedexMother.random().valueOf(),
      description: PokedexPokemonDescriptionMother.random().valueOf(),
      height: PokedexPokemonHeightMother.random().valueOf(),
      weight: -1
    });
  }

  static invalidHeight (): CreatePokedexPokemonCommand {
    return this.create({
      id: PokemonIdMother.random().valueOf(),
      name: PokemonNameMother.random().valueOf(),
      types: PokemonTypesMother.random().toPrimitive(),
      numberPokedex: PokedexPokemonNumberPokedexMother.random().valueOf(),
      description: PokedexPokemonDescriptionMother.random().valueOf(),
      height: -1,
      weight: PokedexPokemonWeightMother.random().valueOf()
    });
  }

  static invalidTypes (): CreatePokedexPokemonCommand {
    return this.create({
      id: PokemonIdMother.random().valueOf(),
      name: PokemonNameMother.random().valueOf(),
      types: PokemonTypesMother.invalid().toPrimitive(),
      numberPokedex: PokedexPokemonNumberPokedexMother.random().valueOf(),
      description: PokedexPokemonDescriptionMother.random().valueOf(),
      height: PokedexPokemonHeightMother.random().valueOf(),
      weight: PokedexPokemonWeightMother.random().valueOf()
    });
  }

  static repeatedTypes (): CreatePokedexPokemonCommand {
    return this.create({
      id: PokemonIdMother.random().valueOf(),
      name: PokemonNameMother.random().valueOf(),
      types: PokemonTypesMother.repeated().toPrimitive(),
      numberPokedex: PokedexPokemonNumberPokedexMother.random().valueOf(),
      description: PokedexPokemonDescriptionMother.random().valueOf(),
      height: PokedexPokemonHeightMother.random().valueOf(),
      weight: PokedexPokemonWeightMother.random().valueOf()
    });
  }
}
