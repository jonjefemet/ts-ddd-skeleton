import PokedexPokemonNumberPokedexMother from "./PokedexPokemonNumberPokedexMother";
import PokemonIdMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonIdMother";
import PokemonNameMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonName";
import PokemonTypesMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonTypesMother";
import PokedexPokemonDescriptionMother from "./PokedexPokemonDescriptionMother";
import PokedexPokemonWeightMother from "./PokedexPokemonWeightMother";
import PokedexPokemonHeightMother from "./PokedexPokemonHeightMother";
import { PokedexPokemon, PokedexPokemonProps } from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemon";
import CreatePokedexPokemonCommand from "@context/pokemon_example/pokedex/pokemon/application/create/CreatePokedexPokemonCommand";
import PokemonType from "@context/pokemon_example/pokemon/pokemon/domain/PokemonType";

export default class PokedexPokemonMother {

  static random (): PokedexPokemon {

    return PokedexPokemonMother.create({
      id: PokemonIdMother.random(),
      name: PokemonNameMother.random(),
      types: PokemonTypesMother.random(),
      numberPokedex: PokedexPokemonNumberPokedexMother.random(),
      description: PokedexPokemonDescriptionMother.random(),
      height: PokedexPokemonHeightMother.random(),
      weight: PokedexPokemonWeightMother.random()
    });
  }

  static create ( props: PokedexPokemonProps ): PokedexPokemon {
    return new PokedexPokemon( props );
  }

  static fromCommand ( command: CreatePokedexPokemonCommand ): PokedexPokemon {
    return PokedexPokemonMother.create({
      id: PokemonIdMother.create( command.id ),
      name: PokemonNameMother.create( command.name ),
      types: PokemonTypesMother.create( command.types.map( type => PokemonType.fromValue( type ))),
      numberPokedex: PokedexPokemonNumberPokedexMother.create( command.numberPokedex ),
      description: PokedexPokemonDescriptionMother.create( command.description ),
      height: PokedexPokemonHeightMother.create( command.height ),
      weight: PokedexPokemonWeightMother.create( command.weight )
    });
  }
}